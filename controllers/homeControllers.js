const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

exports.HomePage = (req, res) => {
    const userToken = req.cookies.userToken;
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.render('home',{ notUser: true })
            }
            else {
                let userEmail = decoded.result;
                pool.getConnection((err, connection) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        connection.query('SELECT * FROM users WHERE email = ?', [userEmail], (err,data) => {
                            res.render('home', {data})
                        })  
                    }
                });

            }
        })
    }
    else {
        res.render('home',{notUser: true})
    }
}


exports.userProfilePage = (req, res) => {
    const userToken = req.cookies.userToken;
    if (userToken) {
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.redirect('/auth/login/')
            }
            else {
                let userEmail = decoded.result;
                pool.getConnection((err, connection) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        connection.query('SELECT * FROM users WHERE email = ?', [userEmail], (err,data) => {
                            res.render('userProfile', {data})
                        })  
                    }
                });

            }
        })
    }
    else {
        res.redirect('/auth/login/')
    }
}