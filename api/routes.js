var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/another/route', function(req, res){
  res.render('index', { title: 'yes another route' });
});

router.get('/setup', function(req, res){
  res.render('setup', { title: 'setup page' });
});

module.exports = router;