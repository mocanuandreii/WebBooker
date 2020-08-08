module.exports = function(app) {

    const company = require('./company.controller.js');

    // Retrieve all Companies
    app.get('/api/company', company.findAll);

    app.post('/api/company/create', company.create);
}