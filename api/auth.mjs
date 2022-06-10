import { User, PaymentPage } from '../db/db.mjs';
import {isEmailValid, randomString} from '../lib/core.mjs';
import {sendTextEmail} from '../lib/email.mjs';

import {setLoginCode, getLoginCode} from '../lib/redis.mjs'
 
export function login(req, res){
  res.render('login');
}

export function enterCode(req, res){
  res.render('login_code');
}

export async function loginPost(req, res){
  let email = req.body.email;
  
  //TODO: deeper email validity
  if(!isEmailValid(email)) res.status(400).send();
  else {
    let [err, user] = await User.findOrCreate({email}, {email});
    if(err){
      console.log("failure to get user", err);
      res.send(500);
    }
    else if(!user){
      console.log("no user found");
      res.status(400).send();
    }
    else{
      const org_id = user.id
      const where = { id: user.id };
      const update = { org_id }; /* Use User's Id Ads org_id for now */

      if(user.__created){
        let err;

        [err] = await User.update({where, update});
        if(err) return res.send(500);

        [err] = await PaymentPage.createDefaultPage(org_id);
        if(err) return res.send(500);
      }

      console.log("found user", user, "sending email");

      let [err, ret] = await _sendLoginEmail(user);
      
      if(err) {
        console.error("error in auth.mjs#loginPost", err);
        res.status(400).send();
      }
      else res.redirect('/auth/enter-code');
    }
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
  console.log("code post login id", err, userId)
  if(err || !userId) res.status(401).send();
  else{
    //loggedin setup session
    let [err, user] = await User.findById(userId);
    console.log("code post user", user);
    if(err) res.status(500).send();
    
    req.session.user = user;
    res.redirect('/app');
  }
};