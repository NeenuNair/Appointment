const mongoose = require('mongoose');

const Schema= mongoose.Schema;
var NewAppointmentSchema = new Schema({

    name : String,
    age : String,
    place : String,
    phoneNumber: Number,
    date: String
});
 var Appointmentdata = mongoose.model('appointment',NewAppointmentSchema,'appointments');
 module.exports = Appointmentdata;

