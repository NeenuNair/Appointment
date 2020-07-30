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

router.get('/allAppointments',(req,res)=>
{
  res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    AppointmentData.find()
               .then(function(appointments){
                    console.log(appointments)
                res.send(appointments);          
               });
});

router.post('/appointments',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
  const uId=req.body.userId;
    console.log("Id"+uId)
    AppointmentData.find({userId:uId})
               .then(function(appointment){
                    console.log("log"+appointment)
                res.send(appointment);          
               });
  });

router.post('/insert',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log(req.body.appointment);
  var appointment= {
      name : req.body.appointment.name,
      userId : req.body.appointment.userId,
      age : req.body.appointment.age,
      place : req.body.appointment.place,
      phoneNumber : req.body.appointment.phoneNumber,
      date : req.body.appointment.date,
      slot : req.body.appointment.slot
      
  }
  var appointment = new AppointmentData(appointment);
  AppointmentData.findOne({place:appointment.place,date:appointment.date,slot:appointment.slot},
    (error,result)=>{
      console.log(result);
      if(!result)
      {
        
        appointment.save();
        res.send({message:"OK"})
      }
      else
      {
        res.send({message:"Slot Taken!"})
      }
    })
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
      date : req.body.appointment.date,
      slot : req.body.appointment.slot
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
    // let payload = {subject: registeredUser._id}
    // let token = jwt.sign(payload, 'secretKey')
    // res.status(200).send({token})
    res.send({message:"Successfully Signed Up!"})
  }
})
})

router.post('/login', (req, res) => {
  let userData = req.body
  console.log(userData)
  User.findOne({email: userData.email,password:userData.password}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Credentials')
      }  
     else {
        let payload = {subject: user._id,type:user.type}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
  })

module.exports = router;