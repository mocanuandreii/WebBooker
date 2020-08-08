module.exports = function(app) {

    const carType = require('./carType.controller.js');

    // Retrieve all Companies
    app.get('/api/cartype', carType.findAll);

    app.post('/api/cartype/create', carType.create);
}