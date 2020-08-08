module.exports = (sequelize, Sequelize) => {

    const driverStatus = sequelize.define('driverStatus', {
        id_driver: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_user: {
            type: 'VARCHAR'
        },
        online: {
            type: 'BIT'
        },
        status: {
            type: 'BIT'
        },
        lat: {
            type: 'FLOAT'
        },
        long: {
            type: 'FLOAT'
        }
    });

    return driverStatus;
}