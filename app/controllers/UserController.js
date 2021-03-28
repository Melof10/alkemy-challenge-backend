const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const db = require('../models');
const User = db.users;

exports.signUp = (req, res) => {    
    const user = {
        email: req.body.email.toLowerCase(),
        password: req.body.password
    };    
    
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err){
            res.status(500).send({
                message: 'Error del servidor'
            })
        }else{
            user.password = hash;
            User.create(user)
            .then(data => {
                res.status(200).send({
                    accessToken: jwt.createAccessToken(data),
                    refreshToken: jwt.refreshAccessToken(data)
                })            
            }).catch(err => {                                
                res.status(500).send({                        
                    message: err.errors
                })            
            })
        }
    })        
};

exports.signIn = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };    

    User.findOne({
        where: {
            email: user.email
        }
    })
    .then(data => {  
        bcrypt.compare(user.password, data.password, (err, valid) => {
            if(err){                         
                res.status(500).send({
                    message: 'Error en el servidor'
                })
            }else if(!valid){                
                res.status(500).send({
                    message: 'Usuario o contraseña incorrecta'
                })
            }else{
                res.status(200).send({
                    accessToken: jwt.createAccessToken(data),
                    refreshToken: jwt.refreshAccessToken(data)
                })
            }
        })                      
    }).catch(err => {              
        res.status(500).send({
            message: 'Usuario inexistente'
        })
    });
};