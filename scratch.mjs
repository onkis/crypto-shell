import 'dotenv/config';

import {User} from './db/db.mjs';
// import {sendTextEmail} from "./lib/email.mjs";
// 
// async function main(){
//   let ret = await sendTextEmail("mike.ball3@gmail.com", "Did this work", "hello nurse!");
//   console.log("sent a message", ret);
// }


async function main(){
  let rec = {email: "mike.ball3@gmail.com"};
  
  let [err, ret] = await User.findOrCreate(rec, rec);
  
  console.log("Result", err, ret);
}

main();