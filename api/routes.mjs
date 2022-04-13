import { Assets } from '../db/db.mjs';
import assets from './assets.mjs';
import users from './users.mjs';
import fs from 'fs';
import express from 'express';
import {wwwAuth} from "../lib/middleware.mjs";
import {rateLimit} from "../lib/rate_limit.mjs";

const script = fs.readFileSync('./public/dist/js/donate_script.js', { encoding: 'utf8' });
const router = express.Router();
export default router;

router.get('/', function(req, res){
  res.render('index');
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

/* USERS */
router.get('/api/user/:id', users.get);
router.post('/api/user', users.create);

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
