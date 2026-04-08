const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
    tire_type: String,
    size: String,
    cost: Number
});

module.exports = mongoose.model('Tire', tireSchema);