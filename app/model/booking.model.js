module.exports = (sequelize, Sequelize) => {

    const booking = sequelize.define('booking', {
        id_booking: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
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
        id_driver: {
            type: 'INTEGER'
        },
        from_adress: {
            type: 'VARCHAR'
        },
        to_adress: {
            type: 'VARCHAR'
        },
        distance: {
            type: 'INTEGER'
        },
        duration: {
            type: 'TIME'
        },
        price: {
            type: 'INTEGER'
        },
        payment_method: {
            type: 'VARCHAR'
        },
        created_at: {
            type: 'TIMESTAMP'
        },
        updated_at: {
            type: 'TIMESTAMP'
        },
        status: {
            type: 'VARCHAR'
        },
        done: {
            type: 'BIT'
        }
    });

    return booking;
}