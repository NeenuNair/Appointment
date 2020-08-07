// const mongoose = require('mongoose');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AppointmentDB');
const Schema = mongoose.Schema;

var NewAppointmentSchema = new Schema({
    userId:String,
    name : String,
    age : String,
    place : String,
    phoneNumber: Number,
    date: String,
    slot: String
});
 var Appointmentdata = mongoose.model('appointment',NewAppointmentSchema,'appointments');
 module.exports = Appointmentdata;

