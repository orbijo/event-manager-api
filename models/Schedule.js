module.exports = (sequelize, DataTypes) => {
    
    const Schedule = sequelize.define('Schedule', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        event_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        attendedAt: DataTypes.DATE,
        // timestamps enabled by default in sequelize
        
        
    }, {
        paranoid: true //deleted at
    });

    return Schedule

}