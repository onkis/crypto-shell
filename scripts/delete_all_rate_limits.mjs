import 'dotenv/config';
import { redisClient } from "../lib/redis.mjs";
import {IP_KEY, COOKIE_KEY, BA_IP_KEY,EMAIL_KEY} from "../lib/rate_limit.mjs"
import {asyncWrap} from "../lib/core.mjs";

async function main(){
  let keys = [IP_KEY, COOKIE_KEY, BA_IP_KEY,EMAIL_KEY];
  
  for(let i = 0; i < keys.length; i+=1){
    let key = keys[i];
    
    let [err, toRemove] = await asyncWrap(redisClient.keys(key+"*"));
    
    console.log("Removing...", toRemove);
    
    await asyncWrap(redisClient.del(toRemove));
  }
  
  console.log("finished!");
  process.exit(0);
}

await main();