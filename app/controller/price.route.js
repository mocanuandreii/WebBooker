module.exports = function(app) {

    const price = require('./price.controller.js');

    // Retrieve all Companies
    app.get('/api/price', price.findAll);

    app.post('/api/price/create', price.create);
}