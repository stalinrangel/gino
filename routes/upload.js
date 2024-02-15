var express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
var router = express.Router();
const multer  = require('multer');

// Configuración de multer para guardar las imágenes en el sistema de archivos
const profile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profile/')  // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.fieldname + '-' + Date.now()) // Nombre del archivo
  }
})

const upload_profile = multer({ storage: profile })


router.post('/profile', upload_profile.single('imagen'), function (req, res, next) {
    const response={
        msg:'Imagen subida correctamente',
        path:'public/images/profile/'+req.file.filename
    }
    
    res.status(200).json(response)
 
})

module.exports = router;
