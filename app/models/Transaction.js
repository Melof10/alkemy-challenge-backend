module.exports = (sequelize, Sequelize) => {
    const transaction = sequelize.define('transactions', {
        concept: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
            validate: {                                
                len: [10, 50]
            }
        },
        amount: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            required: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            required: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true          
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true          
        }
    });

    return transaction;
};