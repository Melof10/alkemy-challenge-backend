const db = require('../models');
const User = db.users;

exports.register = (req, res) => {    
    const user = {
        email: req.body.email,
        password: req.body.password,
        userId: req.body.userId
    };

    User.create(user)
    .then(data => {
        res.send(data);
    }).catch(err => {                
        res.status(500).send({                        
            errors: err.errors
        })            
    })
};

exports.login = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 'error retrieving User with id= '+id
        });
    });
};