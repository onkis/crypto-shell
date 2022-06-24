import { PaymentPage } from '../db/db.mjs';
import paymentpage from './paymentpage.mjs';
import donations from './donations.mjs';
import users from './users.mjs';
import fs from 'fs';
import express from 'express';
import {wwwAuth} from "../lib/middleware.mjs";
import {rateLimit} from "../lib/rate_limit.mjs";

import transactions from "./transactions.mjs";

const script = fs.readFileSync('./public/dist/js/donate_script.js', { encoding: 'utf8' });
const router = express.Router();
export default router;

router.get('/', function(req, res){
  res.render('index');
});

router.get('/donate_landing_page', async function(req, res){
  const { id } = req.query;
  /* TODO: Get Org Details */
  const [err, record] = await PaymentPage.findById(id);
  if(err){
    console.log(err);
    return res.send(500);
  }

  const data = encodeURI(JSON.stringify({ ...record.config }));

  res.render('donate_landing_page', { data });
});

//TOOD: find a better way to import the routes?
import {login, enterCode, loginPost, codePost} from './auth.mjs';
router.get('/login', login);
router.get('/auth/enter-code', enterCode);

router.post('/auth/login', rateLimit, loginPost);
router.post('/auth/enter-code', rateLimit, codePost);

router.get('/app', wwwAuth, function(req, res){
  res.render("app")
});

router.get('/logout', wwwAuth, function(req, res){
  req.session.destroy();
  res.redirect('/');
});

//TODO: if dev mode...
router.get('/uikit', function(req, res){
  res.render('uikit');
});

router.get('/setup', function(req, res){
  res.render('setup');
});

/* API For PaymentPage Table */
router.get('/api/paymentpage/:id', wwwAuth, paymentpage.get);
router.put('/api/paymentpage/:id',wwwAuth, paymentpage.update);
router.delete('/api/paymentpage/:id',wwwAuth, paymentpage.destroy);

router.post('/api/file-upload/:page_id', wwwAuth, paymentpage.fileUpload);

/* API For Donation Table */
//TODO: This API needs some kind of route security to ensure we don't
//get spammed by random donation create calls
router.post('/api/donation', donations.create);
router.delete('/api/donation/:id', donations.destroy); 

router.get('/api/transactions', wwwAuth, transactions.list);

/* USERS */
router.get('/api/user/current', wwwAuth, users.currentUser);

/* TODO: move to separate file... but for now its probably fine */
router.get('/x', async function(req, res){
  const { id } = req.query;
  /* TODO: Get Org Details */
  const [err, record] = await PaymentPage.findById(id);
  if(err){
    console.log(err);
    return res.send(500);
  }

  const { address, label } = record.config;

  /* Build Donation Script */
  const message = 'Donation ID: 100';

  const response = _buildScript(address, label, message);

  res.send(response);
});

function _buildScript(address, label, message){
  const response = `
    const DONATION_PROPS = {
      address: "${address}",
      label: "${label}",
      message: "${message}"
    };
    ${script}
  `;

  return response;
}
