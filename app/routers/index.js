function getRoutes(app){
    require('./UserRoutes')(app);
    require('./TransactionRoutes')(app);
    require('./TypeRoutes')(app);
}

module.exports = getRoutes;