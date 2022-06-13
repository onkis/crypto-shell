//TODO: this file is left here incase 
//going all in on sqlite was a bad idea


import { asyncWrap } from './core.mjs';
import {KVStore} from '../db/db.mjs';
//A redis connection string
//import { createClient } from 'redis';
//redis[s]://[[username][:password]@][host][:port][/db-number]



// function redisError(err){
//   console.trace();
//   console.log('Redis Client Error redis.mjs', err);
// }
// 
// 
// 
// export const redisClient = createClient({
//   url: process.env.REDIS_CONN
// });
// redisClient.on('error', redisError); 
// //Apparently to use this you must....
// //await redisClient.connect();
// redisClient.connect().catch(redisError).then(function(){
//   console.log("connected to redis");
// });



//** The legacy redis client is for request session */
// export const legacyRedisClient = createClient({
//   url: process.env.REDIS_CONN,
//   legacyMode: true
// });
// legacyRedisClient.on('error', redisError);
// //Apparently to use this you must....
// //await redisClient.connect();
// legacyRedisClient.connect().catch(redisError).then(function(){
//   console.log("connected to legacy redis");
// });


const LOGIN_CODE = "LOGIN_CODE:";
/**
 * set's a two min login code for a user
 * @param {String} code - The code to set
 * @param {Number} userId - The id of the user record in the db
 * @returns {Array}  - [err, ret] tuple
 */
export async function setLoginCode(code, userId){
  let twoMins = 120;
  return KVStore.set(LOGIN_CODE+code, userId, {EX: twoMins});
}
/**
 * get a login code
 * @param {String} code - The code to lookup
 * @returns {Array}  - [err, userId] tuple 
 */
export async function getLoginCode(code){
  return KVStore.get(LOGIN_CODE+code);
}

