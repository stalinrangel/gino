var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const service=require('./../models/roles')



router.get('/', function(req, res, next) {
    console.log(req.query) // print all response
    console.log(req.query.hub) // print all response
    console.log(req.query.hub.verifyToken) // print all response
    console.log('get'); // print all response

    const verifyToken=req.query.verifyToken;

    if (verifyToken=='hola') {
        const challenge= req.query.challenge;
        res.status(200).send(challenge);
    }else{
        res.status(404).send('Acceso no autorizado');
    }
  
});

router.post('/', function(req, res, next) {
    console.log(req.query) // print all response
    console.log('post'); // print all response
    const verifyToken=req.query.verifyToken;

    if (verifyToken=='hola') {
        const challenge= req.query.challenge;
        res.status(200).send(challenge);
    }else{
        res.status(404).send('Acceso no autorizado');
    }
});



module.exports = router;
    