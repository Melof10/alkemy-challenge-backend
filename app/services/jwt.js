const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = 'gR7ch9Svfj8Le4c186Ghs48hheb3902nh5DsA';

exports.createAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
}

exports.refreshAccessToken = (user) => {
    const payload = {
        id: user.id,
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payload, SECRET_KEY);
}

exports.decodedToken = (token) => {
    return jwt.decode(token, SECRET_KEY);
}