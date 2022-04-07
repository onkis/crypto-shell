import {redisClient as redis} from "./redis.mjs";
import {asyncWrap} from "./core.mjs";
import crypto from "crypto";

export const IP_KEY = "RateLimit:IP-";
export const COOKIE_KEY = "RateLimit:COOKIE:";
export const BA_IP_KEY = "BadActorLimit:IP-";
export const EMAIL_KEY = "RateLimit:Email:";

/**
 * rate limiter for Auth Endpoints
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @param {Function} next - Allow next middleware to run
 */
export async function rateLimit(req, res, next){
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  let cookieId = req.sessionID;
  
  const ipKey = IP_KEY+ip;
  const cookieKey = COOKIE_KEY+cookieId;
  
  const HOUR = 60*60;
  
  //TODO: batch up redis calls for improved perf
  let [ipErr, isRateLimited] = await _isRateLimited(ipKey, 3, HOUR);

  if(ipErr) {
    return res.status(500).send();
  }
  
  if(isRateLimited){
    console.log("Request IP Rate limited", ip, cookieId)
    return res.status(429).send();
  }
  //TODO: batch up redis calls for improved perf
  let [cookieErr, isCookieLimited] = await _isRateLimited(cookieKey, 3, HOUR);
  
  if(cookieErr) {
    return res.status(500).send();
  }
  
  if(isCookieLimited){
    console.log("Request Cookie Rate limited", ip, cookieId)
    return res.status(429).send();
  }
  next();
}
//
/**
 * The purpose of this middleware is to block users
 * who trigger too many 500s, 401s or 429s
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @param {Function} next - allows next middleware
 */
export async function banBadActors(req, res, next){
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log("ban bad actors...", req.url);
  const ipKey = BA_IP_KEY+ip;
  const DAY = 60*60*24;
  let [err, count] = await asyncWrap(redis.get(ipKey));
  //todo errors?

  //if your causes more than 30 errors in a day you are locked
  if(count > 30){ 
    console.error("Max errors reached. IP blocked: ",ip);
    res.status(423).send();//LOCKED
  }
  else{
    res.on("finish", async function(){
      if(res.statusCode === 500 || res.statusCode === 401 || res.statusCode === 429 || res.statusCode === 423){
        //increment counter
        let multi = redis.multi();
        multi.incr(ipKey);
        if(!count) multi.expire(ipKey, DAY);
        await asyncWrap(multi.exec()); //todo async wrap?....
      }
    }); 
    next();
  }
}
/**
 * checks the rate limit to determine if we
 * should send an email to this user
 *
 * @param {String} email - Email Address
 * @returns {Array}  - [error, Boolean]
 */
export async function canSendEmail(email){
  let key = EMAIL_KEY+_sha256(email);
  let [err, ret] = await _isRateLimited(key, 15, 60*60*24);
  return [err, !ret];
}

function _sha256(str){
  return crypto.createHash('sha256').update(str).digest('hex');
}



/**
 * Helps determine if a rate limit has been reached
 * @param {String} key - unique key in redis
 * @param {Number} limit - Max Tries for this key
 * @param {Number} waitTime - Wait time in Seconds
 * @returns {Array}  - [err, Boolean] True if rate limited, false otherwise...
 */
async function _isRateLimited(key, limit, waitTime){
  //increment the count
  let [err, count] = await asyncWrap(redis.get(key));
  if(err) return [err, null];
  
  if(count > limit){
    return [null, true];
  }
  else{
    let multi = redis.multi();
    multi.incr(key);
    if(!count) multi.expire(key, waitTime)
    let [err, ret] = await asyncWrap(multi.exec()); //TODO might need to async wrap this call....
    
    //Should we return false or null when an error happens?
    if(err) return [err, null];
    else return [err, false];
  }
}
