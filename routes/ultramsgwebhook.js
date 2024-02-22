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
  try{   
     console.log(req.body.entry[0].changes[0].value); 


     
     const from=req.body.entry[0].changes[0].value.messages[0].from;
     if (req.body.entry[0].changes[0].value.messages[0].interactive) {
      console.log(req.body.entry[0].changes[0].value.messages[0].interactive)
      if (req.body.entry[0].changes[0].value.messages[0].interactive.type=='list_reply') {
        console.log(req.body.entry[0].changes[0].value.messages[0].interactive.list_reply.description)
        let id=req.body.entry[0].changes[0].value.messages[0].interactive.list_reply.description;
        const numeroEncontrado = id.match(/ID:\s*(\d+)/);
        if (numeroEncontrado) {
          

          const resultado=numeroEncontrado[0].split(":");
          if(resultado[0]=='ID'){
            enviarOpcion(from,'Para ver a tu proveedor presiona en el siguiente link: ');
            let url='https://service24.app/detail-provider/'+numeroEncontrado[1];
            sendMessageToWhatsappProveedor(from,url);
            
          } 
        } else {
          let url='https://service24es.com/FAQ/';
          console.log('No se encontró ningún número después de "ID: " en la cadena');
          enviarOpcion(from,'Pulsa en el siguiente link para ir la seccion FAQ: ');
          sendMessageToWhatsappProveedor(from,url);
        }
      }
      if (req.body.entry[0].changes[0].value.messages[0].interactive.type=='button_reply') {
        console.log('button_reply');
        let action=req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
        console.log(action)
        console.log(action=='Preguntas frecuentes');
        if (action=='Preguntas frecuentes') {
          enviarList(from,frecuentes);
        }
        console.log(action=='Buscar un proveedor');
        if (action=='Buscar un proveedor') {
          let opcion1='¿Qué servicios buscas?';

          enviarOpcion(from,opcion1);
        }
      }
      //res.status(200).send('Exito');
     }else if (req.body.entry[0].changes[0].value.messages[0].text.body) {
      const message=req.body.entry[0].changes[0].value.messages[0].text.body;
      

      console.log(message) 
      console.log(from) ;
      calldialogflow(message,from);
      //res.status(200).send('Exito');
     }else if (req.body.entry[0].changes[0].value.statuses) {
      //res.status(200).send('Exito');
     } 
     
     res.status(200).json(from);
    } catch(error){
      //console.log(error);
      res.status(200).json('error');
    }
});


async function calldialogflow(text,from){
    const sesionn=from+'@c.us'
    console.log(sesionn);
    let session = sessionIds.get(sesionn);
    console.log(session)
    let payload = await dialogflow.sendToDialogFlow(text, sesionn);
    console.log(payload.action)

    if (payload.action=="hola.action") {
       
        await enviarTexto(text,from);
        await enviarButtom(text,from);
    }else if(payload.action=="frecuentes.action"){
      
        //enviarTextoUrl(text);
        awaitenviarList(from,frecuentes);
        //enviarButtom(text);
    }else if (payload.action=="categoria.info.action") {
        subcategoria=payload.parameters.fields.categoriaName.stringValue;
        productos= await getProducts(payload.parameters.fields.categoriaName.stringValue);
       
        let responses = payload.fulfillmentMessages;
        for (const response of responses) {
          await sendMessageToWhatsappCategorias(from, productos);
        }
    }else if (payload.action=="proveedor.info.action") {
        proveedor= getProveedor(payload.parameters.fields.number.numberValue);
        console.log(proveedor)
        let responses = payload.fulfillmentMessages;
        for (const response of responses) {
          await sendMessageToWhatsappProveedor(from,id);
        }
    }
    else{    
        let responses = payload.fulfillmentMessages;
       
        for (const response of responses) {
          console.log(response.text)
          let opcion1='¿Qué servicios buscas?';
          if (response.text.text==opcion1) {
            enviarOpcion(from,opcion1);
          }
        }
    }

}

function getProducts(categoria){
    return new Promise((resolve, reject) => {
        axios.get('https://service24.app/apii/public/subcategorias_bot/'+categoria)
        .then((response) => {
         
           console.log(response.data);
           
            resolve(response.data.subcategorias);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function getProveedor(id){
    return new Promise((resolve, reject) => {
        axios.get('https://service24.app/apii/public/productos/'+id)
        .then((response) => {
            //console.log(response.data);
            resolve(response.data.producto);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function sendMessageToWhatsappCategorias( from, response) {
    
    return new Promise((resolve, reject) => {
    let lista=[];
    let listap=[];
    for (let i = 0; i < response.length; i++) {
      listap=[];
        for (let j = 0; j < response[i].productos.length; j++) {
            response[i].productos[j].title='Proveedor: ' + response[i].productos[j].nombre;
            response[i].productos[j].description='ID: ' +response[i].productos[j].id + ' - ' +response[i].productos[j].descripcion;
            listap.push({
              "id": response[i].productos[j].id,
              "title": response[i].productos[j].nombre,
              "description": 'ID: ' +response[i].productos[j].id + ' - ' +response[i].productos[j].descripcion
            });
        }
        if (response[i].productos.length>0) {
            lista.push({
                "title": response[i].nombre,
                "rows": listap
            });
            
        }
        
    }
    
    

    const categ={
      "type": "list",
      "header": {
          "type": "text",
          "text": "Service24"
      },
      "body": {
        "text": "Aquí te mostramos los proveedores disponibles en "+subcategoria+":"
      },
      "action": {
          "button": "Ver",
          "sections": lista
      }
    };

    console.log(lista);
    

    enviarList(from, categ);

    
    });
  }

  function sendMessageToWhatsappProveedor(from, url) {
    console.log(from);

   
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
        "to": from,
        "type": "text",
        "text": { // the text object
          "preview_url": true,
          "body": url
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


const token='EAAPDHrJXdvwBO6vn48NZBEMdwZBUEHZAHHOw56AvejmBbzlUcaxgXJj5bZCa3YDCmsrsPCSPf26o066Jajq03UUE9wYG2ObKsofePrkAtCu23VPoROpXlrZAW7iinewgrkgdz1EuuxDSZAalqqKX6MZBJxdlDtrwNav8ydXSqKP5d3xlNnegEe6JaTFIikr8rYC64Fw4bSdtIk0hauq';

function enviarTexto(mesanje,from){
  
  let hola='Bienvenido a Service24!\n' +
  '\n' +
  'Descarga nuestra app:\n' +
  'https://service24es.com/links\n' +
  '\n' +
  'Visita nuestra web:\n' +
  'https://service24.app/\n' +
  '\n' +
  'Nuestras redes:\n' +
  'https://www.instagram.com/service24.uy/?';

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
      "to": from,
      "type": "text",
      "text": { // the text object
        "preview_url": false,
        "body": hola
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


function  enviarOpcion(from,opcion){
  console.log(from);
  let hola=opcion;

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
      "to": from,
      "type": "text",
      "text": { // the text object
        "preview_url": false,
        "body": hola
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

function enviarList(from,list){
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
      "to": from,
      "type": "interactive",
      "interactive": list
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

function enviarButtom(mesanje,from){
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
      "to": from,
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


const frecuentes={
  "type": "list",
  "header": {
      "type": "text",
      "text": "Service24"
  },
  "body": {
    "text": "Preguntas frecuentes"
  },
  "action": {
      "button": "Ver",
      "sections": [
          {
              "title": "Selecciona una opción:",
              "rows": [
                  {
                      "id": "<LIST_SECTION_1_ROW_1_ID>",
                      "title": "¿Qué es Service24?",
                      "description":"La App de todos los profesionales"
                  },
                  {
                      "id": "<LIST_SECTION_1_ROW_2_ID>",
                      "title": "¿Buscar proveedores?",
                      "description":"Como encontrar un proveedor de servicio"
                  },
                  {
                      "id": "<LIST_SECTION_1_ROW_4_ID>",
                      "title": "¿Qué ofrece la APP?",
                      "description":"Qué tipos de servicios ofrecen la App"
                  },
                  {
                      "id": "<LIST_SECTION_1_ROW_3_ID>",
                      "title": "Contactar proveedores",
                      "description":"¿Cómo contactar a un proveedor de servicio?"
                  },
                  {
                      "id": "<LIST_SECTION_1_ROW_5_ID>",
                      "title": "¿Eres proveedor?",
                      "description":"¿Cómo puedo convertirme en un proveedor de servicio?"
                  }
              ]
          }
      ]
  }
};


module.exports = router;
    