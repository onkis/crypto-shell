import {user} from './db/db.mjs';

async function main(){
  let err, ret = await user.findById(1);
  console.log("result", err, ret);  
}

main();