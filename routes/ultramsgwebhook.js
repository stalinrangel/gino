var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();

const dialogflow = require("./dialogflow");
const axios = require('axios');
const sessionIds = new Map();

router.get('/', function(req, res, next) {
     // print all response
     console.log(req.body); 
     console.log(req.query); 
    const modo=req.query;
    console.log(modo); 
    

    const verifyToken=modo['hub.verify_token'];
    console.log(verifyToken); 
    if (verifyToken=='hola') {
        
        console.log('challenge'); 
        res.status(200).send(modo['hub.challenge']);
    }else{
        res.status(404).send('Acceso no autorizado');
    }
  
});

router.post('/', function(req, res, next) {
     // print all response
     console.log(req.body.entry[0].changes[0].value.messages); 
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


function calldialogflow(){

    let payload = dialogflow.sendToDialogFlow(message.body, session);
    console.log(payload)
    if (payload.action=="hola.action") {

        enviarTexto(message);
    }else if(payload.action=="frecuentes.action"){
      
        enviarTextoUrl(message);
        enviarList(message);
        enviarButtom(message);
    }else if (payload.action=="categoria.info.action") {
        subcategoria=payload.parameters.fields.categoriaName.stringValue;
        productos= getProducts(payload.parameters.fields.categoriaName.stringValue);
        let responses = payload.fulfillmentMessages;
        for (const response of responses) {
             sendMessageToWhatsappCategorias(client, message, productos);
        }
    }else if (payload.action=="proveedor.info.action") {
        proveedor= getProveedor(payload.parameters.fields.number.numberValue);
        console.log(proveedor)
        let responses = payload.fulfillmentMessages;
        for (const response of responses) {
             sendMessageToWhatsappProveedor(client, message, proveedor);
        }
    }
    else{    
        let responses = payload.fulfillmentMessages;
        for (const response of responses) {
             sendMessageToWhatsapp(client, message, response);
        }
    }

}


module.exports = router;
    