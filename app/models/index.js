const dbConfig = require('../config/index');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'alkemyChallenge',
    'root',
    '',
    {
        host: dbConfig.host,
        dialect: 'mysql',
        operatorAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./User')(sequelize, Sequelize);
db.transaction = require('./Transaction')(sequelize, Sequelize);
db.types = require('./Type')(sequelize, Sequelize);

/***** Relations *****/ 

// User
db.users.hasMany(db.transaction);
// Type
db.types.hasMany(db.transaction);
// Transaction
db.transaction.belongsTo(db.users);
db.transaction.belongsTo(db.types);

module.exports = db;