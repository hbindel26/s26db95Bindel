var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var tires_controller = require('../controllers/tires');

/// API ROUTE ///
// GET resources base
router.get('/', api_controller.api);

/// TIRE ROUTES ///
// POST request for creating a Tire
router.post('/tires', tires_controller.tires_create_post);

// DELETE request to delete Tire
router.delete('/tires/:id', tires_controller.tires_delete);

// PUT request to update Tire
router.put('/tires/:id', tires_controller.tires_update_put);

// GET request for one Tire
router.get('/tires/:id', tires_controller.tires_detail);

// GET request for list of all Tire items
router.get('/tires', tires_controller.tires_list);

module.exports = router;