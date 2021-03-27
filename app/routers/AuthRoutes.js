module.exports = app => {
    const auth = require("../controllers/AuthController.js");

    let express = require('express')
    let router = express.Router();
      
    router.post("/refresh-access-token", auth.refreshAccessToken);                

    app.use('/api/auth', router);
};