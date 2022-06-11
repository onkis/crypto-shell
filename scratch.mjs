import 'dotenv/config';

import {KVStore} from './db/db.mjs';
// import {sendTextEmail} from "./lib/email.mjs";
// 
// async function main(){
//   let ret = await sendTextEmail("mike.ball3@gmail.com", "Did this work", "hello nurse!");
//   console.log("sent a message", ret);
// }


async function main(){
  
  KVStore.delCB("LOGIN_CODE:JTMMLPEQ", function(err, ret){
    console.log("del", err, ret);
  })
  
}

main();