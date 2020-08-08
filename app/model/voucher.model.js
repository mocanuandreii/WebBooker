module.exports = (sequelize, Sequelize) => {

    const Voucher = sequelize.define('voucher', {
        code: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        value: {
            type: 'INTEGER'
        },
        type: {
            type: 'VARCHAR'
        },
        from: {
            type: 'TIMESTAMP'
        },
        to: {
            type: 'TIMESTAMP'
        },
        enabled: {
            type: 'BIT'
        }
    });

    return Voucher;
}