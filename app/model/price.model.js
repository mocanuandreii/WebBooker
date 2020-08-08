module.exports = (sequelize, Sequelize) => {

    const price = sequelize.define('price', {
        id_price: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER'
        },
        id_cartype: {
            type: 'INTEGER'
        },
        id_user: {
            type: 'INTEGER'
        },
        distance_threshold: {
            type: 'INTEGER'
        },
        charge: {
            type: 'INTEGER'
        },
        type: {
            type: 'VARCHAR'
        },
        created_at: {
            type: 'TIMESTAMP'
        },
        updated_at: {
            type: 'TIMESTAMP'
        }
    });

    return price;
}