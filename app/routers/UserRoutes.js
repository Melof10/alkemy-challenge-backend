module.exports = app => {
    const user = require("../controllers/UserController.js");

    let express = require('express')
    let router = express.Router();
      
    router.post("/", user.register);      
    router.get("/:id", user.login);          

    app.use('/api/users', router);
};