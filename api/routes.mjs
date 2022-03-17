import { Assets } from '../db/db.mjs';
import assets from './assets.mjs';
import fs from 'fs';
import express from 'express';
const router = express.Router();
export default router;

const script = "";
//const script = fs.readFileSync('./public/dist/js/bundle.js', { encoding: 'utf8' });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/another/route', function(req, res){
  res.render('index', { title: 'yes another route' });
});

router.get('/setup', function(req, res){
  res.render('setup', { title: 'setup page' });
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

  const { address, label } = record[0].config;

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