import { createClient } from 'redis';
import { asyncWrap } from './core.mjs';
//A redis connection string
//redis[s]://[[username][:password]@][host][:port][/db-number]



function redisError(err){
  console.trace();
  console.log('Redis Client Error redis.mjs', err);
}



export const redisClient = createClient({
  url: process.env.REDIS_CONN
});
redisClient.on('error', redisError); 
//Apparently to use this you must....
//await redisClient.connect();
redisClient.connect().catch(redisError).then(function(){
  console.log("connected to redis");
});




export const legacyRedisClient = createClient({
  url: process.env.REDIS_CONN,
  legacyMode: true
});
legacyRedisClient.on('error', redisError);
//Apparently to use this you must....
//await redisClient.connect();
legacyRedisClient.connect().catch(redisError).then(function(){
  console.log("connected to legacy redis");
});




const LOGIN_CODE = "LOGIN_CODE:";

export async function setLoginCode(code, userId){
  let twoMins = 120;
  let ret, err;
  try{
    ret = await redisClient.set(LOGIN_CODE+code, userId, "EX", twoMins);
  } catch(e){
    error = e;
  }
  
  return [err, ret];
}

export async function getLoginCode(code){
  let ret, err;
  try{
    console.log("getting", LOGIN_CODE+code)
    ret = await redisClient.get(LOGIN_CODE+code);
    console.log("get response", ret);
  } catch(e){
    error = e;
  }
  
  return [err, ret];
}

