module.exports = (sequelize, DataTypes) => {
    
    const UserRole = sequelize.define('UserRole', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        // timestamps enabled by default in sequelize
        
        
    }, {
        // Options
        paranoid: true, //deleted at
        tableName: 'User_Roles'
    });

    return UserRole

}