const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String
});

// SAFETY CHECK: If it's an object, get the default property; otherwise use it directly
const pluginFunction = (typeof passportLocalMongoose === 'function') 
    ? passportLocalMongoose 
    : passportLocalMongoose.default;

Account.plugin(pluginFunction);

module.exports = mongoose.model('Account', Account);