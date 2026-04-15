var Tires = require('../models/tires');

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

// Detail for a specific Tire.
exports.tires_detail = async function(req, res) {
    console.log("detail" + req.params.id);
    try {
        let result = await Tires.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": "document for id ${req.params.id} not found"}`);
    }
};

// Handle Tire create on POST.
exports.tires_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Tires();
    // We are looking for a body, since POST does not have query parameters.
    // We require that it be a JSON object
    document.tire_type = req.body.tire_type;
    document.size = req.body.size;
    document.cost = req.body.cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Tire delete on DELETE.
exports.tires_delete = async function(req, res) {
    console.log("delete " + req.params.id);
    try {
        let result = await Tires.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle Tire update on PUT.
exports.tires_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        // 1. Find the document
        let toUpdate = await Tires.findById(req.params.id);

        // 2. Check if the document exists before trying to update it
        if (!toUpdate) {
            res.status(404);
            return res.send(`{"error": "Document for id ${req.params.id} not found"}`);
        }

        // 3. Update properties ONLY if they are defined in the request body
        if (req.body.tire_type) toUpdate.tire_type = req.body.tire_type;
        if (req.body.cost) toUpdate.cost = req.body.cost;
        if (req.body.size) toUpdate.size = req.body.size;

        // 4. Save and return the result
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": "${err}: Update for id ${req.params.id} failed"}`);
    }
};

// Handle a show one view with id specified by query
exports.tires_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id);
    try {
        let result = await Tires.findById(req.query.id);
        res.render('tiredetail', { title: 'Tire Detail', toShow: result });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": "${err}"}`);
    }
};