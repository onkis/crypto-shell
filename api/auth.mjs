import { User } from '../db/db.mjs';
import {isEmailValid, randomString} from '../lib/core.mjs';
import {sendTextEmail} from '../lib/email.mjs';
 
import {setLoginCode} from '../lib/redis.mjs'
 
export function login(req, res){
  res.render('login');
}

export function enterCode(req, res){
  res.render('login_code');
}


export async function loginPost(req, res){
  let email = req.body.email;
  
  //TODO: deeper email validity
  if(isEmailValid(email)){
    let [err, user] = await User.findOrCreate({email}, {email});
    
    if(err || !user) res.status(400).send();
    else if(user){
      console.log("found user", user, "sending email")
      let [err, ret] = await _sendLoginEmail(user);
      
      if(err) res.status(400).send();
      
      else res.redirect('/auth/enter-code');
    }
  }
  else{
    res.status(400).send();
  }
}

async function _sendLoginEmail(user){
  
  let loginCode = randomString(8);
  
  let message = `
    Your Login Code is: ${loginCode}
    It is valid for 2 minutes.
  `;
  
  let [err, r] = await setLoginCode(loginCode, user.id);
  
  if(err) return [err, null];
  return sendTextEmail(user.email, message, "Your Login Code");

}

export async function codePost(req, res){
  let code = req.body.code;
  
  let [err, userId] = await getLoginCode(code);
  
  if(err || !userId) res.status(401).send();
  else{
    //loggedin setup session
    let [err, user] = await User.findById(userId);
    
    if(err) res.status(500).send();
    
    req.session.user = user;
    res.redirect('/app');
  }
};