import { Assets } from '../db/db.mjs';

export async function create(req, res){
  const id = req.params.id;
  const newRecord = req.body;

  const [err, asset] = await Assets.create({...newRecord});
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(asset).send();
}

export async function get(req, res){
  const { params } = req;
  const { org_id } = req?.session?.user;

  const [err, assets] = await Assets.findOne({ org_id });
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

  const [err, assets] = await Assets.update({ where, update });
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(assets[0]).send();
}

export async function destroy(req, res){
  const id = req.params.id;
  const [err, assets] = await Assets.destroy({ id });
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.send(204)
}

export default { create, get, update, destroy };