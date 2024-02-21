var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const service=require('./../models/roles')


router.get('/', (req, res) => {
    console.log(req.body) // print all response
    console.log(123)
    //messageFrom=req.body['data']['from'] // sender number
    //messageMsg=req.body['data']['body'] // Message text
    res.status(200).end()
  })

router.post('/', (req, res) => {
    console.log(req.body) // print all response

    //messageFrom=req.body['data']['from'] // sender number
    //messageMsg=req.body['data']['body'] // Message text
    res.status(200).end()
})
const single=(req,res)=> {
    console.log(req.body) // print all response

    res.status(200).end()
}
const create=(req,res)=> {
    const user= {name,designation} = req.body;
    console.log(user)
    return service
    .create(user)
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));
}
const update=(req,res)=> {
    const user= {name,designation} = req.body;
    console.log(user)
    return service
    .update({id:req.params.id},user)
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));
}

const eliminate=(req,res)=> 
    service.eliminate({id:req.params.id})
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));


router.get('/', single);

router.post("/",create);

module.exports = router;
    


module.exports = router;