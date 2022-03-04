import {User} from './db/db.mjs';

async function main(){
  let err, ret = await User.findById(1);
  console.log("result", err, ret);  
}

main();