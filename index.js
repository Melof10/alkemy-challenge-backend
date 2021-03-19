const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./app/models');

db.sequelize.sync({ force: false });

const { config } = require('./app/config');

const getRoutes = require('./app/routers');

getRoutes(app);

app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
})