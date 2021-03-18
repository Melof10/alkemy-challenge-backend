module.exports = (app) => {
    const transaction = require('../controllers/TransactionController');

    let express = require('express');
    let router = express.Router();

    router.post('/', transaction.create);
    router.get('/all/:id', transaction.findAll);
    router.get('/all/last/:id', transaction.findAllLast);
    router.get('/one/:id', transaction.findOne);
    router.put('/update/:id', transaction.update);
    router.delete('/delete/:id', transaction.delete);

    app.use('/api/transaction', router);
}