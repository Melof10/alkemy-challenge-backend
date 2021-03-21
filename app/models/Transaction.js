module.exports = (sequelize, Sequelize) => {
    const transaction = sequelize.define('transactions', {
        concept: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Debe colocar un valor'
                }
            }            
        },
        amount: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Debe colocar un valor'
                },
                isDecimal: {
                    msg: 'Debe colocar un valor numérico'
                }
            }
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Debe colocar un valor'
                },
                isDate: {
                    msg: 'Debe ser una fecha'
                }
            }
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