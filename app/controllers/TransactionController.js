const db = require('../models');
const Transaction = db.transaction;
const Type = db.types;
const User = db.users;
const sequelize = require('sequelize');
const setDate = require('../utils/setDate');

exports.create = (req, res) => {
    const transaction = {
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date,        
        userId: req.body.userId,
        typeId: req.body.typeId
    };    

    Transaction.create(transaction)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    });
};

exports.findAll = (req, res) => {    
    const id = req.params.id;

    Transaction.findAll({
        include: [
            {             
                model: User,
                attributes: ['email']
            },
            {             
                model: Type,
                attributes: ['name']
            }
        ],
        where: {
            userId: id
        },
        order: [
            ['id', 'DESC']
        ]
    })
    .then(data => {        
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.findAllLast = (req, res) => {    
    const id = req.params.id;

    Transaction.findAll({
        include: [
            {             
                model: User,
                attributes: ['email']
            },
            {             
                model: Type,
                attributes: ['name']
            }
        ],
        where: {
            userId: id
        },
        limit: 10,
        order: [
            ['id', 'DESC']
        ]
    })
    .then(data => {                      
        for(i = 0; i < data.length; i++){     
            data[i].dataValues.date = setDate(data[i].dataValues.date);            
        }
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.getTransactionsIncome = (req, res) => {    
    const id = req.params.id;

    Transaction.findAll({
        include: [       
            {             
                model: User,
                attributes: ['email']
            },     
            {             
                model: Type,
                attributes: ['name']
            }
        ],
        where: {
            userId: id,
            typeId: 1
        },
        limit: 10,
        order: [
            ['id', 'DESC']
        ]
    })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.getTransactionsExpenses = (req, res) => {    
    const id = req.params.id;

    Transaction.findAll({
        include: [        
            {             
                model: User,
                attributes: ['email']
            },    
            {             
                model: Type,
                attributes: ['name']
            }
        ],
        where: {
            userId: id,
            typeId: 2
        },
        limit: 10,
        order: [
            ['id', 'DESC']
        ]
    })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.getSumIncome = (req, res) => {    
    const id = req.params.id;

    Transaction.findAll({
        include: [            
            {             
                model: Type,
                attributes: ['name']
            }
        ],
        attributes: [          
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
        ],
        where: {
            userId: id,
            typeId: 1
        }
    })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.getSumExpenses = (req, res) => {    
    const id = req.params.id;

    Transaction.findAll({
        include: [            
            {             
                model: Type,
                attributes: ['name']
            }
        ],
        attributes: [          
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
        ],
        where: {
            userId: id,
            typeId: 2
        }
    })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.findOne = (req, res) => {
    const transactionId = req.params.id;

    Transaction.findByPk(transactionId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
};

exports.update = (req, res) => {
    const transactionId = req.params.id;

    Transaction.update(req.body, {
        where: {
            id: transactionId
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.delete = (req, res) => {
    const transactionId = req.params.id;

    Transaction.destroy({
        where: {
            id: transactionId
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}