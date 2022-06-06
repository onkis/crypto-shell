import 'dotenv/config';

import {Assets} from './db/db.mjs';
// import {sendTextEmail} from "./lib/email.mjs";
// 
// async function main(){
//   let ret = await sendTextEmail("mike.ball3@gmail.com", "Did this work", "hello nurse!");
//   console.log("sent a message", ret);
// }


async function main(){
  let [err, asset] = await Assets.update({where: {id: 1}, update: {config: {"dork": "test", "f": "nurse"}} });
  console.log(err, asset);
}

main();