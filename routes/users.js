var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const service=require('./../models/users')




            
  /* GET users listing. */
  router.get('/', function(req, res, next) {
            return service.all()
            .then((response)=>res.json(response))
            .catch((e)=>res.json({e}));
  });

  router.get('/all', function(req, res, next) {
    const userToken = req.cookies.userToken;
    if (userToken) {
      verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
              res.json('err')
          }
          else {
            return service.all()
            .then((response)=>res.json(response))
            .catch((e)=>res.json({e}));
          }
        })
    }
    else {
      console.log('err2')
        console.log(req.cookies.userToken)
        console.log('err2')
        res.json('err2')
    }
  });

  const list=(req,res)=>{
    console.log('sss222s')
    return service.all()
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));
  }
  const single=(req,res)=> 
    service.list({id:req.params.id})
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));

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

  const orders=(req,res)=> 
    service.orders({id:req.params.id})
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));
  
  const pedidos=(req,res)=> 
    service.pedidos({id:req.params.id})
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));
    


router.get('/:id', single);
router.get('/orders/:id', orders);
router.get('/pedidos/:id', pedidos);
router.post("/",create);
router.put('/:id',update);
router.delete('/:id',eliminate);

module.exports = router;
