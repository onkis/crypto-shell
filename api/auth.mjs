import bs58 from 'bs58';
import pkg from 'tweetnacl';
import { v4 as uuidv4 } from 'uuid';

import { User, PaymentPage } from '../db/db.mjs';
import { isEmailValid, randomString } from '../lib/core.mjs';
import { sendTextEmail } from '../lib/email.mjs';

import { setLoginCode, getLoginCode,
         setLoginMessage, getLoginMessage } from '../lib/redis.mjs'
 
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
      res.status(500).send();
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
        if(err) return res.status(500).send();

        [err] = await PaymentPage.createDefaultPage(org_id);
        if(err) return res.status(500).send();
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

export async function loginWithWalletGetMessage(req, res){
  let err, msg, user;
  const public_address = req?.body?.public_address;

  /* 1. FindOrCreate User */
  [err, user] = await User.findOrCreate({ public_address }, { public_address });
  if(err){
    console.error("Failed to findOrCreate user | auth.mjs#loginWithWalletGetMessage", err);
    return res.status(500).send();
  }

  /* 3. Check if message is already created */
  [err, msg] = await getLoginMessage(public_address);
  if(err){
    console.log("Error to check for message | auth.mjs#loginWithWalletGetMessage", err);
    return res.status(500).send();
  }
  else if(msg) return res.status(200).json({ msg, exists: true });
  
  /* 3. Create Message To Sign */
  msg = _createMessage(user.id);

  /* 4. Save Message In KVS */
  [err] = await setLoginMessage(public_address, msg);
  if(err) {
    console.log("Failed to set login message in KVS | auth.mjs#loginWithWalletGetMessage", err);
    return res.status(500).send();
  }

  res.status(200).json({ msg });
}

export async function validateMessage(req, res){
  let err, user, validSignature, msg;
  const { public_address, sig } = req?.body;

  /* Basic request validation */
  if(!public_address?.length || !sig.length) return res.status(400).send();

  /* 1. Find user from public address */
  [err, user] = await User.findOne({ public_address });
  if(err){
    console.error("Failed to findOne user | auth.mjs#validateMessage", err);
    return res.status(500).send();
  }
  else if(!user?.id){
    console.error("No User Found | auth.mjs#validateMessage");
    return res.status(400).send();
  }

  /* 2. Get message from KVS */
  [err, msg] = await getLoginMessage(public_address);
  if(err){
    console.error("Error to get message | auth.mjs#validateMessage", err);
    return res.status(500).send();
  }
  else if(!msg){
    return res.status(404).send();
  }

  /* 3. Validate signature */
  [err, validSignature] = _validateSignature(msg, sig, public_address);
  if(err){
    console.error("Failed to validate signature | auth.mjs#validateMessage", err);
    return res.status(500).send();
  }
  else if(!validSignature){
    return res.status(401).send();
  }
  else{
    req.session.user = user;
    res.status(200).send();
  }
}

function _createMessage(userId){
  const uuid = uuidv4();
  return `
    I AM THE BREAD OF LIFE

    ${uuid} - ${userId}
  `;
}

/**
 * Validates signature
 * @param  {String} message        message encoded as base58 string
 * @param  {String} signature      signature encoded as base58 string
 * @param  {String} public_address public_address encoded as base58 string
 * @return {[Error, Bool]}
 */
function _validateSignature(message, signature, public_address){
  const { sign } = pkg;
  try{
    const msg_uint8 = new TextEncoder().encode(message);
    const sig_unint8 = bs58.decode(signature);
    const pk_uint8 = bs58.decode(public_address);
    const isValid = sign.detached.verify(msg_uint8, sig_unint8, pk_uint8);

    return [null, isValid];
  }
  catch(e){
    console.log("Failed validating signature | auth.mjs#_validateSignature", e);
    return [e];
  }
}


