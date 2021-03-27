module.exports = app => {
    const user = require("../controllers/UserController.js");

    let express = require('express')
    let router = express.Router();
      
    router.post("/signup", user.signUp);      
    router.post("/signin", user.signIn);          

    app.use('/api/users', router);
};