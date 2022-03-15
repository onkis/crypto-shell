import assets from './assets.mjs';
import fs from 'fs';
import express from 'express';
const router = express.Router();
export default router;

const script = fs.readFileSync('./public/dist/js/bundle.js', { encoding: 'utf8' });

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

/* TODO: move to separate file... but for now its probably fine */
router.get('/x', function(req, res){
  const { id } = req.query;
  /* TODO: Get Org Details */

  /* Build Donation Script  */
  const address = 'wBgDX9D5sn9opVV4EQYDEvsLYT4intU5TttZRi7LqK8',
        label = 'Donation For Mack',
        message = 'Donation ID: 100';

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
