module.exports = (sequelize, DataTypes) => {
    
    const Schedule = sequelize.define('Schedule', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        // timestamps enabled by default in sequelize
        
        
    }, {
        paranoid: true //deleted at
    });

    return Schedule

}