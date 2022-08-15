import { PaymentPage, User } from '../db/db.mjs';
import {uploadFileToS3} from '../lib/upload.mjs';

export async function create(req, res){
  const id = req.params.id;
  const newRecord = req.body;

  const [err, paymentPage] = await PaymentPage.create({...newRecord});
  if(err){
    console.error(`failed to create paymentPage | paymentpage.mjs#create`, err);
    return res.send(500);
  }

  res.json(paymentPage).send();
}
//TODO these should take the current user an id
//as the main argument
export async function get(req, res){
  const { params } = req;
  const { org_id } = req?.session?.user;

  const [err, paymentPage] = await PaymentPage.findOne({ org_id });
  if(err){
    console.error(`failed to get paymentPage | paymentpage.mjs#get`, err);
    return res.send(500);
  }

  res.json(paymentPage);
}

export async function update(req, res){
  const { params, body } = req;
  const { org_id } = req?.session?.user;
  delete body.id;
  delete body.org_id;

  const is_published = body?.is_published || false;

  const where = { org_id };
  const update = { ...body, is_published };

  const [err, assets] = await PaymentPage.update({ where, update });
  if(err){
    console.error(`failed to update paymentPage | paymentpage.mjs#update`, err);
    return res.send(500);
  }

  res.json(assets[0]).send();
}

export async function destroy(req, res){
  const id = req.params.id;
  const [err, assets] = await PaymentPage.destroy({ id });
  if(err){
    console.error(`failed to destroy paymentPage | paymentpage.mjs#destroy`, err);
    return res.send(500);
  }

  res.send(204)
}

export async function publish(req, res){
  let err, user, paymentPage, assets;
  const { org_id } = req?.session?.user;
  const is_published = true, eula = true;

  [err, user] = await User.findOne({ org_id, is_email_validated: true });
  if(err){
    console.error(`failed to get user | paymentpage.mjs#publish`, err);
    return res.status(500).send();
  }
  else if(!user){
    return res.status(200).json({ VALIDATE_EMAIL: true });
  }

  [err, paymentPage] = await PaymentPage.findOne({ org_id, eula });
  if(err){
    console.error(`failed to get paymentPage | paymentpage.mjs#publish`, err);
    return res.status(500).send();
  }
  else if(!paymentPage){
    return res.status(200).json({ EULA: true });
  }

  [err, assets] = await _setPublishedState(org_id, is_published);
  if(err){
    console.error(`failed to get assets | paymentpage.mjs#publish`, err);
    return res.send(500);
  }

  return res.json(assets[0]).send();
}

export async function unpublish(req, res){
  const { org_id } = req?.session?.user;
  const is_published = false;

  const [err, assets] = await _setPublishedState(org_id, is_published);
  if(err){
    console.error(`failed to unpublish | paymentpage.mjs#unpublish`, err);
    return res.send(500);
  }

  res.json(assets[0]).send();
}

async function _setPublishedState(org_id, is_published){
  const where = { org_id };
  const update = { is_published };

  return await PaymentPage.update({ where, update });
}

export async function fileUpload(req, res){
  
  const page_id = req.params.page_id;
  const user_id = req.session.user.id;
    
  let [err, name] = await uploadFileToS3(user_id, page_id, req)
  
  if(err) {
    console.error("paymentpage.mjs#fileUpload file upload error", err);
    res.sendStatus(400);
  }
  else{
    console.log("success", name);
    res.status(200).send({"filePath": name});
  }
}


export async function render(req, res){
  const id = req.params.id;
  
  let [err, page] = await PaymentPage.findByHashId(id);
  
  if(err){
    console.log("render error", err);
    return res.sendStatus(500);
  }
  console.log(page)
  
  const data = encodeURI(JSON.stringify({ ...page.config }));
  
  res.render('donate_page_preview', { data });
}


export default { create, get, update, destroy, publish, unpublish, fileUpload, render };