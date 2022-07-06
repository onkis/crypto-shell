import { Keypair } from '@solana/web3.js';
import { Donation, PaymentPage } from '../db/db.mjs';
import { setDonation, getDonation } from '../lib/redis.mjs'

export async function create(req, res){
  let err, asset, donation;
  const { amount, asset_id, donation_config } = req.body;

  [err, asset] = await PaymentPage.findByHashId(asset_id);
  if(err){
    console.error("failed to find asset | api/donations.mjs#create", err);
    return res.send(500);
  }
  else if(!asset) return res.send(404);

  const { org_id } = asset;
  const transaction_ref_id = new Keypair().publicKey.toString();

  const newDonation = {
    amount,
    asset_id,
    org_id,
    donation_config,
    transaction_ref_id
  };

  [err] = await setDonation(transaction_ref_id, { ...newDonation });
  if(err){
    console.error("failed to create donation | api/donations.mjs#create", err);
    return res.send(500);
  }

  res.json({ transaction_ref_id }).send(); /* only need to pass the reference */
}

export async function get(req, res){
  const { id } = req;

  const [err, donation] = await Donation.findOne({ id });
  if(err){
    console.error("failed to get donation | api/donations.mjs#get", err);
    return res.send(500);
  }

  res.json(donation);
}

export async function destroy(req, res){
  const id = req.params.id;
  const [err] = await Donation.destroy({ id });
  if(err){
    console.error("failed to destroy donation | api/donations.mjs#destroy", err);
    return res.send(500);
  }

  res.send(204)
}

export async function donationSuccessful(reference_id){
  let err, donation;
  [err, donation] = await getDonation(reference_id);
  if(err){
    console.error("failed to get donation from KVS | api/donations.mjs#donationSuccessful", err);
    return [new Error("failed to get donation from KVS")];
  }

  [err] = Donation.create({ ...donation });
  if(err){
    console.error("failed to create donation in postgres | api/donations.mjs#donationSuccessful", err);
    return [new Error("failed to create donation record in postgres")];
  }

  return [];
}

export default { create, get, destroy, donationSuccessful };
