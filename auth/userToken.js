const { verify } = require('jsonwebtoken');
require('dotenv').config()

exports.tokenValidation = (req,res,next) => {

    //geeting the stored cookie from user
    const userToken = req.cookies.userToken;
    if(userToken){

        //verifiying the stored cookie from user
        verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                res.redirect('/')
            }
            else{
                // next will help to jump on next controller
                next()
            }
        })
    }
    else{
        res.redirect('/')
    }
}