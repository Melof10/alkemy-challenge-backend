const db = require('../models');
const Transaction = db.transaction;
const Type = db.types;
const User = db.users;
const sequelize = require('sequelize');

exports.create = (req, res) => {
    const transaction = {
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date,        
        userId: req.body.userId,
        typeId: req.body.typeId
    }

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
        attributes: [
            'id',
            'concept',
            'amount',
            [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date']
        ],
        where: {
            userId: id,
            typeId: 24
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
        attributes: [
            'id',
            'concept',
            'amount',
            [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date']
        ],
        where: {
            userId: id,
            typeId: 34
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
            typeId: 24
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
            typeId: 34
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

    Transaction.findByPk(transactionId)
    .then(data => {
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
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Transacci??n actualizada correctamente"
            });
        } else {
            res.send({
                message: "No se pudo actualizar la transacci??n"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar la transacci??n" + id
        });
    });
}

exports.delete = (req, res) => {
    const transactionId = req.params.id;

    Transaction.destroy({
        where: {
            id: transactionId
        }
    }).then(nums => {
        res.send({ message: `${nums} Transacci??n eliminada!` });
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}