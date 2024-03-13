var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const service=require('./../models/orders')
            
  /* GET users listing. */
  router.get('/', function(req, res, next) {
            return service.all()
            .then((response)=>res.json(response))
            .catch((e)=>res.json({e}));
  });

  const list=(req,res)=>{
    return service.all()
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));
  }
  const single=(req,res)=> 
    service.list({id:req.params.id})
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));

    const ordenes_pedidos=(req,res)=> 
    service.listPedidos({id:req.params.id})
    .then((response)=>res.json(response))
    .catch((e)=>res.json({e}));

  const create=(req,res)=> {
    const { id, info, company_id, user_id, estado, pedido_id } = req.body;
    const user = { id, info, company_id, user_id, estado, pedido_id };
    console.log(user)
    return service
    .create(user)
    .then((response)=>res.json(user))
    .catch((e)=>res.json({user}));
  }
  const update=(req,res)=> {
    const user= {id,info,company_id,user_id,estado,pedido_id} = req.body;
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

router.get('/:id', single);
router.get('/pedidos/:id', ordenes_pedidos);
router.post("/",create);
router.put('/:id',update);
router.delete('/:id',eliminate);

module.exports = router;
