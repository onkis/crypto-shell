import 'dotenv/config';

import {Assets} from './db/db.mjs';
// import {sendTextEmail} from "./lib/email.mjs";
// 
// async function main(){
//   let ret = await sendTextEmail("mike.ball3@gmail.com", "Did this work", "hello nurse!");
//   console.log("sent a message", ret);
// }


async function main(){
  let err, asset;
  [err, asset] = await Assets.findOrCreate({id: 4}, {org_id: 99, config: {"address": "", "label": "Select a Message"}});
  // console.error(err)
  console.log("created/found asset", asset);
  
  [err, asset] = await Assets.update({where: {org_id: 99}, update: {config: {"dork": "test", "f": "nurse"}} });
  
  console.log("updated asset", asset);
  
  [err, asset] = await Assets.findById(4);
  
  console.log("found asset", asset);
  
  process.exit(0);
  
}

main();