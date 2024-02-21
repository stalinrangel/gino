var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const service=require('./../models/roles')



router.get('/', function(req, res, next) {
     // print all response
     console.log(req.body); 
    const modo=req.query;
    console.log(modo); 
    

    const verifyToken=modo['hub.verifyToken'];
    console.log(verifyToken); 
    if (true) {
        const challenge= modo['hub.challenge'];
        console.log(challenge); 
        res.status(200).send(modo['hub.challenge']);
    }else{
        res.status(404).send('Acceso no autorizado');
    }
  
});

router.post('/', function(req, res, next) {
    console.log(req.body); 
    console.log(req.query) // print all response
    console.log('post'); // print all response
    if (true) {
       
        console.log('challenge'); 
        res.status(200).send('hub.challenge');
    }else{
        res.status(404).send('Acceso no autorizado');
    }
});



module.exports = router;
    