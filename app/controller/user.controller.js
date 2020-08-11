const db = require('../config/db.config.js');
const User = db.user;


exports.findAll = (req, res) => {
    User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
            res.json(user);
            console.log(res.json(user));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    // Save to MariaDB database
    User.create({
        id_user: 2,
        id_company: 1,
        user_type: 'admin',
        role: 'admin',
        type: 'permanent',
        password: '123',
        is_account: 1,
        name: 'test',
        adress: 'Str.......',
        email: 'andrei@andrei.com',
        phone_number: '0752123321'
    })
        .then(user => {
            // Send created user to client
            res.json(user);
        })
        .catch(error => res.status(400).send(error))
};

exports.findByEmail = (req, res) => {
    console.log("findByEmail");
    return User.findAll({
        where: {
            email: req.params.email
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
            console.log(req.body);
                if(!user){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(user)
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.findById = (req, res) => {
    return User.findAll({
        where: {
            id_user: req.params.id_user
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
                if(!user){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(user)
            }
        )
        .catch(error => res.status(400).send(error));
}


exports.update = (req, res) => {
    let updateValues =
        {
            name: req.body.name,
            adress: req.body.adress,
            email: req.body.email,
            phone_number: req.body.phoneNumber
        };
    User.update(updateValues, {where: {id_user: req.params.id_user}}).then((result) => {
        console.log(req.body);
    });
};
