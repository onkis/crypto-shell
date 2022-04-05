import { Assets } from '../db/db.mjs';
import assets from './assets.mjs';
import fs from 'fs';
import express from 'express';
import {wwwAuth} from "../lib/middleware.mjs";

const router = express.Router();
export default router;

router.get('/', function(req, res){
  res.render('index');
});

//TOOD: find a better way to import the routes?
import {login, enterCode, loginPost, codePost} from './auth.mjs';
router.get('/login', login);
router.get('/auth/enter-code', enterCode);

//TODO: rate limit these endpoints
router.post('/auth/login', loginPost);
router.post('/auth/enter-code', codePost);

router.get('/app', wwwAuth, function(req, res){
  res.render("app")
});

router.get('/logout', wwwAuth, function(req, res){
  req.session.destroy();
  res.redirect('/login');
});

//TODO: if dev mode...
router.get('/uikit', function(req, res){
  res.render('uikit');
});

router.get('/setup', function(req, res){
  res.render('setup');
});

/* API For Assets Table */
router.get('/api/assets/:id', assets.get);
router.put('/api/assets/:id', assets.update);
router.delete('/api/assets/:id', assets.destroy);

/* TODO: move to separate file... but for now its probably fine */
router.get('/x', async function(req, res){
  const { id } = req.query;
  /* TODO: Get Org Details */
  const [err, record] = await Assets.findById(id);
  if(err){
    console.log(err);
    return res.send(500);
  }

  const { address, label } = record.config;

  /* Build Donation Script  */
  const message = 'Donation ID: 100';

  const response = _buildScript(address, label, message);

  res.send(response);
});

function _buildScript(address, label, message){
  const response = script
    .replace('~~address~~', address)
    .replace('~~label~~', label)
    .replace('~~message~~', message);

  return response;
}
