const Sequelize = require('sequelize');

const sequelize = new Sequelize('webbooker', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        freezeTableName: true,
        timestamps: false,
        operatorsAliases: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.company = require('..\\model\\company.model.js')(sequelize, Sequelize);
db.user = require('..\\model\\user.model.js')(sequelize, Sequelize);
db.account = require('..\\model\\account.model.js')(sequelize, Sequelize);
db.driverStatus = require('..\\model\\driverStatus.model.js')(sequelize, Sequelize);
db.voucher = require('..\\model\\voucher.model.js')(sequelize, Sequelize);
db.carType = require('..\\model\\cartype.model.js')(sequelize, Sequelize);
db.price = require('..\\model\\price.model.js')(sequelize, Sequelize);
db.booking = require('..\\model\\booking.model.js')(sequelize, Sequelize);


module.exports = db;
