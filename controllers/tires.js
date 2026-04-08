var Tires = require('../models/tires');

// List of all Tires
// List of all Tires
exports.tires_list = async function(req, res) {
    try {
        const theTires = await Tires.find();
        res.send(theTires);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};

// Detail for a specific Tire
exports.tires_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Tires detail: ' + req.params.id);
};

// Handle Tire create on POST
exports.tires_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Tires create POST');
};

// Handle Tire delete on DELETE
exports.tires_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Tires delete DELETE ' + req.params.id);
};

// Handle Tire update on PUT
exports.tires_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Tires update PUT ' + req.params.id);
};

// Handle a show all view
exports.tires_view_all_Page = async function(req, res) {
    try {
        const theTires = await Tires.find();
        res.render('tires', { title: 'Tire Search Results', results: theTires });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};