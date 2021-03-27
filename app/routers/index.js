function getRoutes(app){
    require('./UserRoutes')(app);
    require('./TransactionRoutes')(app);
    require('./TypeRoutes')(app);
    require('./AuthRoutes')(app);
}

module.exports = getRoutes;