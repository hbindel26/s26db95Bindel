const mongoose = require("mongoose");

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