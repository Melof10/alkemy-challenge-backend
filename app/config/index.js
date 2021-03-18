require('dotenv').config();

config = {
    dev: process.env.node_env !== 'production',
    port: process.env.port || 3000,
    cors: process.env.cors,
    host: process.env.host,
    database: process.env.database,
    user: process.env.username,
    password: process.env.password,
    dialect: process.env.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = { config }