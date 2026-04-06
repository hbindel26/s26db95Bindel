var express = require('express');
var router = express.Router();

/* GET grid display page. */
router.get('/', function(req, res, next) {
  let query = req.query; // Capture query parameters
  console.log(`rows ${query.rows}`); // Report to server console
  console.log(`cols ${query.cols}`); // Report to server console
  
  // Pass the title and query object to the pug engine
  res.render('grid', { title: 'Grid Display', query: query }); 
});

module.exports = router;