import { User } from '../db/db.mjs';
import {isEmailValid, randomString} from '../lib/core.mjs';
import {sendTextEmail} from '../lib/email.mjs';
 
export function login(req, res){
  res.render('login');
}

export function enterCode(req, res){
  res.render('enter_code');
}


export async function loginPost(req, res){
  let email = req.body.email;
  
  //TODO: deeper email validity
  if(isEmailValid(email)){
    let [err, user] = await User.findOrCreate({email}, {email});
    
    if(err || !user) res.status(400).send();
    else if(user){
      
      res.redirect('/auth/enter-code');
    }
  }
  else{
    res.status(400).send();
  }
}

function _sendLoginEmail(user){
  
  let loginCode = randomString(8);
  
  let message = `
    Your Login Code is: ${loginCode}
  `;
  
  
  
  
  sendTextEmail(user.email, message);

}

export async function codePost(req, res){
  
};