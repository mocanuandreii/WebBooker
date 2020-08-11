const db = require('../config/db.config.js');
const carType = db.carType;


exports.findAll = (req, res) => {
    carType.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(carType => {
            res.json(carType);
            console.log(res.json(carType));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    carType.create({
        id_cartype: 1,
        id_company: 3,
        type: "type",
        description: "deadasfaefe",
        capacity: 24,
    })
        .then(carType => {
            // Send created customer to client
            res.json(carType);
        })
        .catch(error => res.status(400).send(error))
};
