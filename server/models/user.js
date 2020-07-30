const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    type: String
});
var User = mongoose.model('user',userSchema,'users');
module.exports = User;