var express = require('express');
var router = express.Router();

/* GET search results page. */
router.get('/', function(req, res, next) {
  let query = req.query.query;
  res.render('search', { title: 'Search Results', query: query });
});

module.exports = router;