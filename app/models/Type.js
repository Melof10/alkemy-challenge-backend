module.exports = (sequelize, Sequelize) => {
    const type = sequelize.define('types', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        }
    });

    return type;
}