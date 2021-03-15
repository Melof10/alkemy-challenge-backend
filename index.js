const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const { config } = require('./config/index.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.PORT, function(){
    console.log(`Listening http://localhost:${config.port}`);
})