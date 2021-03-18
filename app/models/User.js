module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('users', {        
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                len: [10,20]
            }
        },
        password: {
            type: Sequelize.STRING(64),
            validate: {
                len: [6,20]
            }            
        }
    });

    return user;
};