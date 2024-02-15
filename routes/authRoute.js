const router = require('express').Router();
const { tokenValidation } = require('../auth/userToken');
//const controllers = require('../controllers/homeControllers');
const mysql = require('mysql');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();
const bd=require('./../bd');

const pool = mysql.createPool({
    connectionLimit: 100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})


// Routes
// Login

var Loginuser = (req,res) => {
    const {email, password} = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json('Error de conexion');
        }
        else {
           
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err,data) => {
                if(err){
                    //res.json('login', {message: 'Email or Password is Incorrect'});
                    res.status(404).json('Email o contrasena incorrecta.');
                }
                if(data.length == 0){
                    //res.json('login', {message: `Email Doesn't exist, Try to register`})
                    res.status(404).json('Email no existe');
                }
                else{
                    const checkPassword = compareSync(password, data[0].password);
                   
                    if(checkPassword){
                    //res.json(checkPassword);
                    //Creating the token for logged in user
                        const userToken = sign({result: data[0].email}, process.env.SECRET_KEY, {
                            expiresIn: '600s'
                        })

                        //Sending the token to user's cookie
                        res.cookie('userToken', userToken, {
                            expires: new Date(Date.now() + 600000),
                            httpOnly: true
                        })
                        
                        var legajo;
                        var company;
                        var role;
                        bd('legajos')
                        .select('id','info','company_id','role_id','user_id')
                        .where('user_id',data[0].id)
                            .then((rows) => {
                                legajo=rows;
                                bd('company')
                                .select('id','name','type','info')
                                    .where('id',legajo[0].company_id)
                                        .then((rows) => {
                                            company=rows;
                                            bd('roles')
                                            .select('id','name')
                                                .where('id',legajo[0].role_id)
                                                    .then((rows) => {
                                                        role=rows;
                                                       
                                                        const response={
                                                            'id':data[0].id,
                                                            'name':data[0].name,
                                                            'email':data[0].email,
                                                            'legajo':legajo,
                                                            'role':role,
                                                            'company':company,
                                                            'token':userToken,
                                                            
                                                        }
                                                        
                                                        res.status(200).json(response)
                                                    })
                                                    .catch((error) => {
                                                        console.error(error); 
                                                });
                                        })
                                        .catch((error) => {
                                            console.error(error); 
                                    });
                            })
                            .catch((error) => {
                                console.error(error); 
                        });

                        
                    }
                    else{
                        //res.json('login', {message: 'Email or Password is Incorrect'})
                        res.status(404).json('Email o contrasena incorrecta.')
                    };
                };
            });
        };
    });
};
//router.get('/login', controllers.ViewLoginPage)
router.post('/login', Loginuser)



var RegisterNewPage = (req, res) => {
    
    const {name, email, password, company_id, role_id} = req.body;
    
    //Generating salt for Hashing
    const salt = genSaltSync(10);

    //Hashing the password
    const hashPassword = hashSync(password, salt);

    
    // Connecting to DB
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(404).json('Error de conexion');
        }
        else {
            connection.query('select email from users where email = ?', [email], (err, data) => {
                console.log(data)
                if (data.length != 0) {
                    //res.render('register', {message: 'Already Registered'})
                    res.status(404).json('Ya esta registrado');
                }
                else{
                    connection.query('INSERT INTO users SET name = ?, email = ?, password = ?', [name, email, hashPassword], (err, newRegisteredUser) => {
                        if(err){
                            //res.render('register', {message: 'Something went wrong, Please try again'})
                            res.status(404).json(err);
                            //res.json(err);
                        }
                        res.status(200).json('Registro con exito');
                    })
                }
            })


        }
    });
};


// Register
//router.get('/register', controllers.ViewRegisterPage)
router.post('/register', RegisterNewPage)

module.exports = router;