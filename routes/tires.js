var express = require('express');
const tires_controllers = require('../controllers/tires');
var router = express.Router();

/* GET tires page. */
/* GET detail tire page */
router.get('/detail', tires_controllers.tires_view_one_Page);


module.exports = router;