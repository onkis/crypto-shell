import { Keypair } from '@solana/web3.js';
import { Donation, PaymentPage } from '../db/db.mjs';
import { setDonation, getDonation } from '../lib/redis.mjs'

function list(req, res){
  const page = req?.query?.page || 1;
  const limit = req?.query?.limit || 25;
  const offset = (page - 1) * limit;

  console.log("req", req);

  // Donation.findAll({}, limit=null, offset=null);
  res.json([]);
}

async function create(req, res){
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

async function get(req, res){
  const { id } = req;

  const [err, donation] = await Donation.findOne({ id });
  if(err){
    console.error("failed to get donation | api/donations.mjs#get", err);
    return res.send(500);
  }

  res.json(donation);
}

async function destroy(req, res){
  const id = req.params.id;
  const [err] = await Donation.destroy({ id });
  if(err){
    console.error("failed to destroy donation | api/donations.mjs#destroy", err);
    return res.send(500);
  }

  res.send(204)
}

async function verifyTransaction(req, res){
  let err;
  const { reference_id } = req.params;

  [err] = await donationSuccessful(reference_id);
  if(err){
    console.error("failed to find donation | api/donations.mjs#verifyTransaction", err);
    return res.status(404).send();
  }

  return res.status(200).send();
}

async function donationSuccessful(reference_id){
  let err, donation;
  [err, donation] = await getDonation(reference_id);
  if(err){
    console.error("failed to get donation from KVS | api/donations.mjs#donationSuccessful", err);
    return [new Error("failed to get donation from KVS")];
  }
  else if(!donation?.length){
    return [new Error("failed to find donation in KVS")]; 
  }
  else donation = JSON.parse(donation);

  [err] = await Donation.create(donation);
  if(err){
    console.error("failed to create donation in postgres | api/donations.mjs#donationSuccessful", err);
    return [new Error("failed to create donation record in postgres")];
  }

  return [];
}

export default { create, get, destroy, donationSuccessful, verifyTransaction };
