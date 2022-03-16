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
  const [err, assets] = await Assets.findById(params.id);
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(assets[0]).send();
}

export async function update(req, res){
  const { params, body } = req;
  delete body.id;
  delete body.org_id;

  const where = { id: params.id };
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