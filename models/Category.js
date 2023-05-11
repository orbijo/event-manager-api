module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define('Category', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true,
    });

    return Category

}