import 'dotenv/config';

//import {User} from './db/db.mjs';
import {sendTextEmail} from "./lib/email.mjs";

function main(){
  sendTextEmail("mike.ball3@gmail.com", "Did this work", "hello nurse!", function(err, ret){
    console.log("err", err, ret);
  });
}

main();