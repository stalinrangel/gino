
const mysql = require('mysql');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})


exports.ViewLoginPage = (req, res) => {
    res.render('login', { title: 'Login' })
}
exports.ViewRegisterPage = (req, res) => {
    res.render('register', { title: 'Register' })
}


//Registration of user
exports.RegisterNewPage = (req, res) => {
    const {name, email, password, bio} = req.body;

    //Generating salt for Hashing
    const salt = genSaltSync(10);

    //Hashing the password
    const hashPassword = hashSync(password, salt);


    // Connecting to DB
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        else {
            connection.query('select email from users where email = ?', [email], (err, data) => {
                console.log(data)
                if (data.length != 0) {
                    res.render('register', {message: 'Already Registered'})

                }
                else{
                    connection.query('INSERT INTO users SET name = ?, email = ?, bio = ?, password = ?', [name, email, bio, hashPassword], (err, newRegisteredUser) => {
                        if(err){
                            res.render('register', {message: 'Something went wrong, Please try again'})
                        }
                        res.redirect('/auth/login/')
                    })
                }
            })


        }
    });
}

//Login the user
exports.Loginuser = (req,res) => {
    const {email, password} = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err,data) => {
                if(err){
                    res.render('login', {message: 'Email or Password is Incorrect'});
                }
                if(data.length == 0){
                    res.render('login', {message: `Email Doesn't exist, Try to register`})
                }
                else{
                    const checkPassword = compareSync(password, data[0].password);
                    if(checkPassword){

                    //Creating the token for logged in user
                        const userToken = sign({result: data[0].email}, process.env.SECRET_KEY, {
                            expiresIn: '600s'
                        })

                        //Sending the token to user's cookie
                        res.cookie('userToken', userToken, {
                            expires: new Date(Date.now() + 600000),
                            httpOnly: true
                        })
                        console.log(userToken)
                        res.redirect('/')
                    }
                    else{
                        res.render('login', {message: 'Email or Password is Incorrect'})
                    };
                };
            });
        };
    });
};