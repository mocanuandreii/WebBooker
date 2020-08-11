const db = require('../config/db.config.js');
const price = db.price;


exports.findAll = (req, res) => {
    price.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(price => {
            res.json(price);
            console.log(res.json(price));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    price.create({
        id_price: 1,
        id_company: 3,
        id_cartype: 1,
        id_user: 1,
        distance_threshold: 214,
        charge: 2,
        type: 'paid'
    })
        .then(price => {
            // Send created customer to client
            res.json(price);
        })
        .catch(error => res.status(400).send(error))
};
