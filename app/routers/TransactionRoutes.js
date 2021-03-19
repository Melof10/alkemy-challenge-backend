module.exports = (app) => {
    const transaction = require('../controllers/TransactionController');

    let express = require('express');
    let router = express.Router();

    router.post('/', transaction.create);
    router.get('/all/:id', transaction.findAll);
    router.get('/all/last/:id', transaction.findAllLast);
    router.get('/one/:id', transaction.findOne);
    router.get('/income/:id', transaction.getTransactionsIncome);
    router.get('/expenses/:id', transaction.getTransactionsExpenses);
    router.put('/update/:id', transaction.update);
    router.delete('/delete/:id', transaction.delete);
    router.get('/income/sum/:id', transaction.getSumIncome);
    router.get('/expenses/sum/:id', transaction.getSumExpenses);

    app.use('/api/transaction', router);
}