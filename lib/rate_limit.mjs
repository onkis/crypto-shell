

//There are 3 kinds of rate limiting
//1. Endpoint Limits. Only Allow max number of api calls per ip per hour/day etc
//2. Failure Limits: Exclude those who fail often


async function rateLimit(req, res, next){
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  let cookieId = req.sessionID;
  
  const ipKey = "RateLimit:IP:"+ip;
  const ipLifeTimeKey = "LongTermRateLimit:IP:"+ip;
  const cookieKey = "RateLimit:COOKIE:"+cookieId;
  
  const HOUR = 60*60;
  const DAY = HOUR*24;
  let [ipErr, isRateLimited] = _isRateLimited(ipKey, 3, HOUR);

  if(ipErr) {
    return res.status(500).send();
  }
  
  if(isRateLimited){
    return res.status(429).send();
  }
  
  let [cookieErr, isCookieLimited] = _isRateLimited(cookieKey, 3, HOUR);
  
  if(cookieErr) {
    return res.status(500).send();
  }
  
  if(isCookieLimited){
    return res.status(429).send();
  }
  
  if(res.statusCode === 401 || res.statusCode === 400 || res.statusCode === 500){
    //Increment max limit
    let [ipLifeErr, ipLifeLimited] = _isRateLimited(ipLifeTimeKey, 10, DAY);
    
    if(ipLifeErr) {
      return res.status(500).send();
    }
    
    if(ipLifeLimited){
      return res.status(429).send();
    }
  }
  
  next();
  
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
  let [err, count] = await redis.get(key);
  if(err) return [err, null];
  
  if(count > limit){
    return [null, true];
  }
  else{
    let multi = redis.multi();
    multi.incr(key);
    if(!count) multi.expire(key, waitTime)
    let [err, ret] = await multi.exec(); //TODO might need to async wrap this call....
    
    //Should we return false or null when an error happens?
    if(err) return [err, null];
    else return [err, false];
  }
}
