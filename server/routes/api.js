const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const AppointmentData = require('../models/appointmentData');


const mongoose = require('mongoose');
const db = 'mongodb+srv://user_neenu:dhyan29@mycluster.zxzp2.azure.mongodb.net/appointmentdb?retryWrites=true&w=majority';

mongoose.connect(db, function(err){
  if(err){
      console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')      
  }
});
var app = new express();

function verifyToken(req,res,next){
  if (!req.headers.authorization){
       return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null'){
      return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token,'secretKey')
  if(!payload){
      return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()

}

router.get('/home', (req,res) => {
  console.log(req.body);
});

router.get('/appointments',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
  AppointmentData.find()
        .then(function(appointments){
            res.send(appointments);
        });
});
router.post('/insert',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log(req.body.appointment);
  var appointment= {
      name : req.body.appointment.name,
      age : req.body.appointment.age,
      place : req.body.appointment.place,
      phoneNumber : req.body.appointment.phoneNumber,
      date : req.body.appointment.date
      
  }
  var appointment = new AppointmentData(appointment);
  appointment.save();
});

router.post('/edit',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  const id = req.body.id;
  console.log(id);
  AppointmentData.find()
  .then(function(appointments){
       res.send(appointments);        
  });
});

router.post('/oneAppointment',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  const id = req.body.id;
  AppointmentData.findOne({_id:id})
             .then(function(appointment){
                  res.send(appointment);          
             });
});

router.post('/update',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  AppointmentData.updateOne({_id:req.body.appointment._id},{$set:{ 
      name : req.body.appointment.name,
      age : req.body.appointment.age,
      place : req.body.appointment.place,
      phoneNumber : req.body.appointment.phoneNumber,
      date : req.body.appointment.date
  }})
      .then(function(appointments){
          res.send(appointments);
      });
});
  
router.post('/deleteAppointment',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  const id = req.body.id;
  console.log(id);
  AppointmentData.deleteOne({_id:id})
             .then((data)=>{
                  res.send('Deleted Your Appointment!!');          
             });
});


router.get('/home', (req,res) => {
  console.log(req.body);
});


// router.get('/addorder', verifyToken, (req, res) => {
// })

router.post('/register', (req, res) => {
let userData = req.body
let user = new User(userData)
user.save((err, registeredUser) => {
  if (err) {
    console.log(err)      
  } else {
    let payload = {subject: registeredUser._id}
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).send({token})
  }
})
})

router.post('/login', (req, res) => {
let userData = req.body
User.findOne({email: userData.email}, (err, user) => {
  if (err) {
    console.log(err)    
  } else {
    if (!user) {
      res.status(401).send('Invalid Email')
    } else 
    if ( user.password !== userData.password) {
      res.status(401).send('Invalid Password')
    } else {
      let payload = {subject: user._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  }
})
})

module.exports = router;