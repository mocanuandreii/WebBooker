const db = require('../config/db.config.js');
const booking = db.booking;


exports.findAll = (req, res) => {
    booking.findAll({
        attributes: {exclude: ["createdAt", "updatedAt"]}
    })
        .then(booking => {
            res.json(booking);
            console.log(res.json(booking));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    booking.create({
        id_account: 1,
        id_company: 1,
        id_user: req.body.id_user,
        id_driver: 1,
        id_cartype: 1,
        from_adress: req.body.from_adress,
        to_adress: req.body.to_adress,
        distance: req.body.distance,
        price: req.body.price,
        duration: req.body.duration,
        payment_method: req.body.payment_method,
        status: req.body.status,
        done: 0
    })
        .then(booking => {
            // Send created customer to client
            res.json(booking);
        })
        .catch(error => res.status(400).send(error))
};

exports.findById = (req, res) => {
    return booking.findAll({
        where: {
            id_user: req.params.id_user
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(booking => {
                if(!booking){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(booking)
            }
        )
        .catch(error => res.status(400).send(error));
}
