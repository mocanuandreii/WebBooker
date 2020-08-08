module.exports = function(app) {

    const driverStatus = require('./driverStatus.controller.js');

    // Retrieve all Companies
    app.get('/api/driverStatus', driverStatus.findAll);

    app.post('/api/driverStatus/create', driverStatus.create);
}