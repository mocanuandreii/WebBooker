module.exports = function(app) {

    const account = require('./account.controller.js');

    // Retrieve all Companies
    app.get('/api/account', account.findAll);

    app.post('/api/account/create', account.create);
}