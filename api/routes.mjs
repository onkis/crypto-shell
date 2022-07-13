import { PaymentPage } from '../db/db.mjs';
import paymentpage from './paymentpage.mjs';
import donations from './donations.mjs';
import users from './users.mjs';
import fs from 'fs';
import express from 'express';
import {wwwAuth} from "../lib/middleware.mjs";
import {rateLimit} from "../lib/rate_limit.mjs";

import transactions from "./transactions.mjs";

const router = express.Router();
export default router;

router.get('/', function(req, res){
  res.render('index');
});

router.get('/p/:id/:key', async function(req, res){
  const { id } = req.params;
  /* TODO: Get Org Details */
  const [err, record] = await PaymentPage.findByHashId(id);
  if(err){
    console.log(err);
    return res.sendStatus(500);
  }
  else if(!record?.is_published){
    return res.sendStatus(404);
  }

  const data = encodeURI(JSON.stringify({ ...record.config }));

  res.render('donate_landing_page', { data });
});

//TOOD: find a better way to import the routes?
import {login, enterCode, loginPost, codePost, loginWithWalletGetMessage, validateMessage } from './auth.mjs';
router.get('/login', login);
router.get('/auth/enter-code', enterCode);

router.post('/auth/login', rateLimit, loginPost);
router.post('/auth/enter-code', rateLimit, codePost);

router.post('/auth/wallet-message', rateLimit, loginWithWalletGetMessage);
router.post('/auth/wallet-validate-signature', rateLimit, validateMessage);

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
router.put('/api/paymentpage/:id', wwwAuth, paymentpage.update);
router.delete('/api/paymentpage/:id', wwwAuth, paymentpage.destroy);
router.post('/api/paymentpage/:id/publish', wwwAuth, paymentpage.publish);
router.post('/api/paymentpage/:id/unpublish', wwwAuth, paymentpage.unpublish);

router.post('/api/file-upload/:page_id', wwwAuth, paymentpage.fileUpload);

/* API For Donation Table */
//TODO: This API needs some kind of route security to ensure we don't
//get spammed by random donation create calls
router.post('/api/donation', donations.create);
router.delete('/api/donation/:id', donations.destroy); 
router.post('/api/donation/:reference_id/verify', donations.verifyTransaction);

router.get('/api/transactions', wwwAuth, transactions.list);

/* USERS */
router.get('/api/user/current', wwwAuth, users.currentUser);



