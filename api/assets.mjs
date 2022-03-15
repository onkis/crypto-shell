import { Assets } from '../db/db.mjs';

export async function get(req, res){
  const { params } = req;

  const [err, asset] = await Assets.findById(params.id);
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(asset).send();
}

export default { get };