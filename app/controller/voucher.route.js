module.exports = function(app) {

    const voucher = require('./voucher.controller.js');

    // Retrieve all Companies
    app.get('/api/voucher', voucher.findAll);

    app.post('/api/voucher/create', voucher.create);
}