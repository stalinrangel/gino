var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();

const dialogflow = require("../dialogflow");
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
     const message=req.body.entry[0].changes[0].value.messages[0].text.body;
     const from=req.body.entry[0].changes[0].value.messages[0].from;
     console.log(message) 
     console.log(from) ;
     
     res.status(200).send('Exito');
    
});


function calldialogflow(text,from){
    let session = sessionIds.get(from+'@c.us');
    console.log(session)
    let payload = dialogflow.sendToDialogFlow(text, session);
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

const token='EAAPDHrJXdvwBO9IzTuHU6JLQt0GgdXZCnHrji4meT0CN8xJgU64cNwJPorZAwFv3iMEYFyOEcF2luIOM5evIPH2KXJ0e1jZCjZBYt8tiGCsw5YKk4rOR4gGEggO0ynnxw4pRthqqZCL4Btidr08ZC84gQxx83Iok2CuqRXH06nIZAZBQZAhiuq13MQ72ofN8ZBAlum0ZCoZCazOonebHoK5z';

function enviarTexto(mesanje){
  const options={
    method: 'POST',
    url: 'https://graph.facebook.com/v18.0/216885471516427/messages',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    data: { 
      "messaging_product": "whatsapp", 
      "to": "584127429278", 
      "type": "template", 
      "template": { 
        "name": 
        "hello_world", 
        "language": {
           "code": "en_US" 
        } 
      } 
    }
  };
  console.log('-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
  axios(options)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function enviarTextoUrl(mesanje){
  const options={
    method: 'POST',
    url: 'https://graph.facebook.com/v18.0/216885471516427/messages',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    data: {
      "messaging_product": "whatsapp",
      "to": "584147428420",
      "text": {
          "preview_url": true,
          "body": "Please visit https://youtu.be/hpltvTEiRrY to inspire your day!"
      }
    }
  };
  
  axios(options)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function enviarList(from,title,susbtitle,titleList,buttonText,lista){
  const options={
    method: 'POST',
    url: 'https://graph.facebook.com/v18.0/216885471516427/messages',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    data: {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "584147428420",
      "type": "interactive",
      "interactive": {
          "type": "list",
          "header": {
              "type": "text",
              "text": "<HEADER_TEXT>"
          },
          "body": {
              "text": "<BODY_TEXT>"
          },
          "footer": {
              "text": "<FOOTER_TEXT>"
          },
          "action": {
              "button": "<BUTTON_TEXT>",
              "sections": [
                  {
                      "title": "<LIST_SECTION_1_TITLE>",
                      "rows": [
                          {
                              "id": "<LIST_SECTION_1_ROW_1_ID>",
                              "title": "<SECTION_1_ROW_1_TITLE>",
                              "description": "<SECTION_1_ROW_1_DESC>"
                          },
                          {
                              "id": "<LIST_SECTION_1_ROW_2_ID>",
                              "title": "<SECTION_1_ROW_2_TITLE>",
                              "description": "<SECTION_1_ROW_2_DESC>"
                          }
                      ]
                  },
                  {
                      "title": "<LIST_SECTION_2_TITLE>",
                      "rows": [
                          {
                              "id": "<LIST_SECTION_2_ROW_1_ID>",
                              "title": "<SECTION_2_ROW_1_TITLE>",
                              "description": "<SECTION_2_ROW_1_DESC>"
                          },
                          {
                              "id": "<LIST_SECTION_2_ROW_2_ID>",
                              "title": "<SECTION_2_ROW_2_TITLE>",
                              "description": "<SECTION_2_ROW_2_DESC>"
                          }
                      ]
                  }
              ]
          }
      }
    }
  };
  
  axios(options)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function enviarButtom(mesanje){
  const options={
    method: 'POST',
    url: 'https://graph.facebook.com/v18.0/216885471516427/messages',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    data: {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "584147428420",
      "type": "interactive",
      "interactive": {
          "type": "button",
          "body": {
              "text": "Seleccione una opcion:"
          },
          "action": {
              "buttons": [
                  {
                      "type": "reply",
                      "reply": {
                          "id": "<UNIQUE_BUTTON_ID_1>",
                          "title": "Buscar un proveedor"
                      }
                  },
                  {
                      "type": "reply",
                      "reply": {
                          "id": "<UNIQUE_BUTTON_ID_2>",
                          "title": "Preguntas frecuentes"
                      }
                  }
              ]
          }
      }
    }
  };
  
  axios(options)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}


module.exports = router;
    