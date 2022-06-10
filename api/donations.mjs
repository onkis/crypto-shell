import { Keypair } from '@solana/web3.js';
import { Donation, PaymentPage } from '../db/db.mjs';

export async function create(req, res){
  let err, asset, donation;
  const { amount, asset_id, donation_config } = req.body;

  [err, asset] = await PaymentPage.findOne({ id: asset_id });
  if(err){
    console.error("failed to find asset | api/donations.mjs#create", err);
    return res.send(500);
  }

  const { org_id } = asset;

  const transaction_ref_id = new Keypair().publicKey.toString();

  const newDonation = {
    amount,
    asset_id,
    org_id,
    donation_config,
    transaction_ref_id
  };

  [err, donation] = await Donation.create({ ...newDonation });
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

export default { create, get, destroy };