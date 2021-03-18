const db = require('../models');
const Transaction = db.transaction;
const User = db.users;
const Type = db.types;

exports.create = (req, res) => {
    const transaction = {
        concept: req.body.concept,
        amount: req.body.amount,
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