var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');





// variables entorno
const dotenv=require('dotenv');
dotenv.config();



var app = express();


// CORS
app.use(cors());


// Converting JSON to JavaScript Objects
app.use(bodyParser.json());
// Accessing Cookies from user's Browser
app.use(cookieParser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Servir los archivos estáticos desde la carpeta "dist"
app.use(express.static(path.join(__dirname, 'tu_proyecto_angular/dist')));

// Manejar todas las demás rutas y devolver el archivo "index.html"
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'tu_proyecto_angular/dist/index.html'));
});


//Routes
const authRoutes = require('./routes/authRoute');
app.use('/auth', authRoutes);
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
var rolesRouter = require('./routes/roles');
app.use('/roles', rolesRouter);
const companyRouter = require('./routes/company');
app.use('/company', companyRouter);
const legajosRouter = require('./routes/legajos');
app.use('/legajos', legajosRouter);
const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);
const pedidosRouter = require('./routes/pedidos');
app.use('/pedidos', pedidosRouter);
const uploadRouter = require('./routes/upload');
app.use('/upload', uploadRouter);
app.use('/images/profile', express.static(__dirname + '/public/images/profile'));
app.use('/images/app', express.static(__dirname + '/public/images/app'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
