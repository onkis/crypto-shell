import { createClient } from 'redis';
import { asyncWrap } from './core.mjs';
//A redis connection string
//redis[s]://[[username][:password]@][host][:port][/db-number]

const redisClient = createClient({
  url: process.env.REDIS_CONN,
  legacyMode: true //for express-session
});

function redisError(err){
  console.log('Redis Client Error redis.mjs', err);
}
redisClient.on('error', redisError); 
//Apparently to use this you must....
//await redisClient.connect();

redisClient.connect().catch(redisError).then(function(){
  console.log("connected to redis");
});


export default redisClient;

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

