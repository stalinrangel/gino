var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const service=require('./../models/roles')


router.get('/ultramsgwebhook', (req, res) => {
    console.log(req.body) // print all response
  
    //messageFrom=req.body['data']['from'] // sender number
    //messageMsg=req.body['data']['body'] // Message text
    res.status(200).end()
  })

router.post('/ultramsgwebhook', (req, res) => {
    console.log(req.body) // print all response

    //messageFrom=req.body['data']['from'] // sender number
    //messageMsg=req.body['data']['body'] // Message text
    res.status(200).end()
})