import { createHash } from 'crypto';
import { User, KVStore } from '../db/db.mjs';
import { sendTextEmail, sendHtmlEmail } from '../lib/email.mjs';

async function create(req, res){
  const newRecord = req.body;

  const [err, newUser] = await User.create({...newRecord});
  if(err){
    console.error(err);
    return res.status(500).send();
  }

  res.json(newUser).send();
}

async function get(req, res){
  const { params } = req;
  
  const [err, user] = await User.findById(params.id);
  if(err){
    console.error(err);
    return res.status(500).send();
  }

  res.json(user);
}

async function currentUser(req, res){
  const user = req.session.user;
  res.json(user);
}

async function validateEmailCode(req, res){
  let err, data;
  const { key } = req.params;

  if(!key) return res.render('404');

  [err, data] = await KVStore.get(key);
  if(err){
    return res.status(500).send();
  }
  else if(!data){
    return res.render('404');
  }

  const { email, public_address } = JSON.parse(data);

  if(!email || !public_address) return res.status(400).send();

  const where = { public_address },
        update = { email, is_email_validated: true };

  [err] = await User.update({ where, update });
  if(err){
    console.log("Failed to update user | users.mjs#validateEmailCode", err);
    return res.status(500).send();
  }

  res.redirect('/app');
}

async function sendEmailToValidateUserEmailAddress(req, res){
  let err, user, key;
  const BASE_URL = process.env.BASE_URL;
  const { email } = req.body;
  const public_address = req?.session?.user?.public_address;

  if(!email?.length) return res.status(400).send("no email sent");
  if(!public_address?.length) return res.status(400).send("no public address");

  [err, user] = await User.findOne({ public_address });
  if(err){
    console.error("users.mjs#sendEmailToValidateUserEmailAddress", err);
    return res.status(500).send();
  }
  else if(!user){
    return res.status(404).send();
  }

  [err, key] = await _setValidEmailCode(public_address, email);
  if(err){
    console.log("failed to data in KVS | users.mjs#sendEmailToValidateUserEmailAddress", err);
    return res.status(500).send();
  }

  const VALIDATION_URL = `http://${BASE_URL}/validate_email/${key}`;

  [err] = await _sendValidateEmail(email, VALIDATION_URL);
  if(err) {
    console.error("users.mjs#sendEmailToValidateUserEmailAddress", err);
    return res.status(500).send();
  }

  res.status(200).send();
}

async function _setValidEmailCode(public_address, email){
  const THIRTY_MINUTES = 30 * 60;
  const VAL = { public_address, email };
  const KEY = createHash('md5')
                .update(public_address + Date.now())
                .digest('hex');

  try{
    await KVStore.set(KEY, VAL, { EX: THIRTY_MINUTES });
  }
  catch(err){
    return [err];
  }

  return [null, KEY];
}

async function _sendValidateEmail(email, validation_url){
  const message = `
    <b>Please verify email to enable publishing!</b>

    <a href="${validation_url}">Click here to verify </a>
    <p>It is valid for 30 minutes.</p>
  `;
  
  return sendHtmlEmail(email, message, "Roti Pay - Verify Email");
}

export default { create, get, currentUser, validateEmailCode, sendEmailToValidateUserEmailAddress };