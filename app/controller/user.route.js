module.exports = function(app) {

    const user = require('./user.controller.js');

    // Retrieve all Companies
    app.get('/api/user', user.findAll);

    app.post('/api/user/create', user.create);

    app.get('/api/user/:id_user', user.findById);

    app.get('/api/userEmail/:email', user.findByEmail);

    app.put('/api/user/:id_user', user.update);

}