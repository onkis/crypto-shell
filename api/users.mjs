import { User } from '../db/db.mjs';

export async function create(req, res){
  const newRecord = req.body;

  const [err, newUser] = await User.create({...newRecord});
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(newUser).send();
}

export async function get(req, res){
  const { params } = req;
  
  const [err, user] = await User.findById(params.id);
  if(err){
    console.error(err);
    return res.send(500);
  }

  res.json(user);
}

export default { create, get };