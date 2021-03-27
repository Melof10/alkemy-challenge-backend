const jwt = require('../services/jwt');
const moment = require('moment');
const db = require('../models');
const User = db.users;

willExpireToken = (token) => {
    const { exp } = token;
    const currentDate = moment().unix();

    if(currentDate > exp){
        return true;
    }

    return false;
}

exports.refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    const isTokenExpired = willExpireToken(refreshToken);

    if(isTokenExpired){
        res.status(404).send({
            message: 'refreshToken ha expirado'
        })
    }else{
        const { id } = jwt.decodedToken(refreshToken);
        User.findByPk(id)
        .then(data => {
            res.status(200).send({
                accessToken: jwt.createAccessToken(data),
                refreshToken: refreshToken
            });
        }).catch(err => {
            res.status(500).send({
                errors: err.errors
            });
        })
    }
}

