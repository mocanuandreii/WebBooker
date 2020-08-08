const db = require('..\\config\\db.config.js');
const voucher = db.voucher;


exports.findAll = (req, res) => {
    voucher.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(voucher => {
            res.json(voucher);
            console.log(res.json(voucher));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    voucher.create({
        code: 'AD@QF#32f',
        value : 20,
        type: 'SUMMERVOUCHER',
        from: 'CURRENT_TIMESTAMP',
        to: 'CURRENT_TIMESTAMP',
        enabled: 0
    })
        .then(voucher => {
            // Send created customer to client
            res.json(voucher);
        })
        .catch(error => res.status(400).send(error))
};
