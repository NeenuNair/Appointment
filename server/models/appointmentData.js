const mongoose = require('mongoose');

const Schema= mongoose.Schema;
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

