import { PaymentPage } from '../db/db.mjs';
import {uploadFileToS3} from '../lib/upload.mjs';

export async function create(req, res){
  const id = req.params.id;
  const newRecord = req.body;

  const [err, asset] = await PaymentPage.create({...newRecord});
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(asset).send();
}
//TODO these should take the current user an id
//as the main argument
export async function get(req, res){
  const { params } = req;
  const { org_id } = req?.session?.user;

  const [err, assets] = await PaymentPage.findOne({ org_id });
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(assets);
}

export async function update(req, res){
  const { params, body } = req;
  const { org_id } = req?.session?.user;
  delete body.id;
  delete body.org_id;

  const where = { org_id };
  const update = { ...body };

  const [err, assets] = await PaymentPage.update({ where, update });
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(assets[0]).send();
}

export async function destroy(req, res){
  const id = req.params.id;
  const [err, assets] = await PaymentPage.destroy({ id });
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.send(204)
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

export default { create, get, update, destroy, fileUpload };