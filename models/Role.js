module.exports = (sequelize, DataTypes) => {
    
    const Role = sequelize.define('Role', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {
        paranoid: true
    });

    return Role

}