var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/another/route', function(req, res){
  res.render('index', { title: 'yes another route' });
});

router.get('/purchase', function(req, res){
  res.render('purchase', { title: 'purchase page' });
});

module.exports = router;