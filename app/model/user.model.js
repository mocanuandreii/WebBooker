module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        id_user: {
            type: 'INTEGER',
            primaryKey: true
        },
        id_company: {
            type: 'INTEGER'
        },
        user_type: {
            type: 'VARCHAR'
        },
        role: {
            type: 'VARCHAR'
        },
        type: {
            type: 'VARCHAR'
        },
        password: {
            type: 'VARCHAR'
        },
        id_account: {
            type: 'INTEGER'
        },
        name: {
            type: 'VARCHAR'
        },
        adress: {
            type: 'VARCHAR'
        },
        email: {
            type: 'VARCHAR'
        },
        phone_number: {
            type: 'VARCHAR'
        },
        created_at: {
            type: 'TIMESTAMP'
        },
        updated_at: {
            type: 'TIMESTAMP'
        }
    });

    return User;
}