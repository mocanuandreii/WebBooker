const db = require('../config/db.config.js');
const company = db.company;


exports.findAll = (req, res) => {
    company.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(company => {
            res.json(company);
            console.log(res.json(company));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    company.create({
        id_company: 3,
        name: 'test'
    })
        .then(company => {
            // Send created customer to client
            res.json(company);
        })
        .catch(error => res.status(400).send(error))
};
