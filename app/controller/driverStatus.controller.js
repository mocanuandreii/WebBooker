const db = require('..\\config\\db.config.js');
const driverStatus = db.driverStatus;


exports.findAll = (req, res) => {
    driverStatus.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(driverStatus => {
            res.json(driverStatus);
            console.log(res.json(driverStatus));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    driverStatus.create({
        id_driver: '1',
        id_user: '1',
        online: 0,
        status: 0,
        lat: "42.123",
        long: "42.449"
    })
        .then(driverStatus => {
            // Send created customer to client
            res.json(driverStatus);
        })
        .catch(error => res.status(400).send(error))
};
