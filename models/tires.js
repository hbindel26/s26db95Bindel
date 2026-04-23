const mongoose = require("mongoose");
// A helper function to check if a user is logged in
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
}

const tireSchema = mongoose.Schema({
    tire_type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        min: 0,
        max: 1000
    }
});

module.exports = mongoose.model("Tires", tireSchema);