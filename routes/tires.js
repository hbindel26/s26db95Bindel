var express = require('express');
var router = express.Router();

/* GET tires page. */
router.get('/', function(req, res, next) {
  res.render('tires', { title: 'Search Results Tires' });
});

module.exports = router;