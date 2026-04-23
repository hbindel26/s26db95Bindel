var express = require('express');
const tires_controllers = require('../controllers/tires');
var router = express.Router();

// routes/tires.js
const secured = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Apply to protected routes
router.get('/update', secured, tires_controllers.tires_update_Page);
router.get('/delete', secured, tires_controllers.tires_delete_Page);

module.exports = router;