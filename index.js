const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./app/models');

db.sequelize.sync({ force: false });

const { config } = require('./app/config/index.js');

const getRoutes = require('./app/routers');

getRoutes(app);

app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
})