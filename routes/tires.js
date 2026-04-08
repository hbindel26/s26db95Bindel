var express = require('express');
const tires_controllers = require('../controllers/tires');
var router = express.Router();

/* GET tires page. */
router.get('/', tires_controllers.tires_view_all_Page);


module.exports = router;