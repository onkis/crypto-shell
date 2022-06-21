import { Donation, PaymentPage } from '../db/db.mjs';



export async function list(req, res){
  const { org_id } = req?.session?.user;
  const params = req.params;
  
  let [err, donations] = await Donation.findAll({org_id: org_id}, params.limit, params.offset);
  
  if(err){
    console.error("Error in transactions.mjs#list", err);
    return res.send(500);
  }
  
  res.json(donations);
}

//this line seems stupid
export default { list };