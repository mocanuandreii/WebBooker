const db = require('../config/db.config.js');
const account = db.account;


exports.findAll = (req, res) => {
    account.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(account => {
            res.json(account);
            console.log(res.json(account));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    account.create({
        id_account: '1',
        id_company: '3',
        name: "test",
        type: "type"
    })
        .then(account => {
            // Send created customer to client
            res.json(account);
        })
        .catch(error => res.status(400).send(error))
};
