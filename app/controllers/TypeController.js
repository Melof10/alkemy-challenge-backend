const db = require('../models');
const Type = db.types;

exports.create = (req, res) => {
    const create = {
        name: req.body.name
    }

    Type.create(create)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.findAll = (req, res) => {
    Type.findAll()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errors: err.errors
        })
    })
}

exports.update = (req, res) => {
    const idType = req.params.id;

    Type.update(req.body, {
        where: {
            id: idType
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