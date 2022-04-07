import 'dotenv/config';
import {buildablePaths} from '../lib/middleware.mjs';
import {exec} from '../lib/core.mjs';
async function main(){
  console.log("building...");
  
  for(let key in buildablePaths){
    let cmd = buildablePaths[key];
    console.log(cmd);
    let [err, ret] = await exec(cmd);
    if(err) {
      console.error("Problem with command", cmd, err, ret);
      process.exit(1);
    }
    else console.log(ret);
  }
  console.log("construction complete")
  process.exit(0);
}

main();