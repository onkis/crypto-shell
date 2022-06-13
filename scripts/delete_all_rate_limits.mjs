import 'dotenv/config';
import {KVStore} from "../db/db.mjs";
import {IP_KEY, COOKIE_KEY, BA_IP_KEY,EMAIL_KEY} from "../lib/rate_limit.mjs"

async function main(){
  let keys = [IP_KEY, COOKIE_KEY, BA_IP_KEY,EMAIL_KEY];
  
  for(let i = 0; i < keys.length; i+=1){
    let key = keys[i];
    console.log("Removing...", key);
        
    let [err, ret] = await KVStore.deleteKeys(key+"%");
    console.log("removed", ret);
  }
  
  console.log("finished!");
  process.exit(0);
}

await main();