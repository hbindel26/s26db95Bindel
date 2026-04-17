var express = require('express');
const tires_controllers = require('../controllers/tires');
var router = express.Router();

/* GET tires page. */
router.get('/', tires_controllers.tires_view_all_Page);
/* GET detail tire page */
router.get('/detail', tires_controllers.tires_view_one_Page);
/* GET update tire page */
router.get('/update', tires_controllers.tires_update_Page);
/* GET delete tire page */
router.get('/delete', tires_controllers.tires_delete_Page);

module.exports = router;