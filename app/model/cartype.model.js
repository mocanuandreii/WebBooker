module.exports = (sequelize, Sequelize) => {

    const carType = sequelize.define('cartype', {
        id_cartype: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER'
        },
        type: {
            type: 'VARCHAR'
        },
        picture: {
            type: 'BLOB'
        },
        description: {
            type: 'MEDIUMTEXT'
        },
        capacity: {
            type: 'INTEGER'
        },
        created_at: {
            type: 'TIMESTAMP'
        },
        updated_at: {
            type: 'TIMESTAMP'
        }
    });

    return carType;
}