module.exports = app => {
    const type = require("../controllers/TypeController.js");

    let express = require('express')
    let router = express.Router();
      
    router.post("/", type.create);      
    router.get("/all", type.findAll);          

    app.use('/api/types', router);
};