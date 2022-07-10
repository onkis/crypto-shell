import { Donation, PaymentPage } from '../db/db.mjs';



export async function list(req, res){
  const { org_id } = req?.session?.user;
  const page = req?.query?.page || 1;
  const limit = req?.query?.limit || 25;
  const offset = (page - 1) * limit;
  
  let [err, donations] = await Donation.findAll({ org_id }, limit, offset);
  if(err){
    console.error("Error in transactions.mjs#list", err);
    return res.send(500);
  }
  else if(!donations?.length){
    return res.json([]);
  }
  else{
    donations.forEach(d => {
      d.donation_config = JSON.parse(d.donation_config);
    });

    res.json(donations);
  }
}

//this line seems stupid
export default { list };