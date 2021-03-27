module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('users', {        
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: 'El correo ya existe'
            },
            validate: {
                notNull: {
                    msg: 'Debe colocar un valor'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Debe colocar un valor'
                }
            }            
        }
    });

    return user;
};