import { createClient } from 'redis';

//A redis connection string
//redis[s]://[[username][:password]@][host][:port][/db-number]

const redisClient = createClient({url: process.env.REDIS_CONN});

redisClient.on('error', function redisError(err){
  console.log('Redis Client Error redis.mjs', err));
}); 

export default redisClient;

