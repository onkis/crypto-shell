import { Assets } from '../db/db.mjs';

export async function get(req, res){
  const { params } = req;

  const [err, assets] = await Assets.findById(params.id);
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(assets[0]).send();
}

export default { get };