module.exports = (sequelize, DataTypes) => {
    
    const EventCategory = sequelize.define('EventCategory', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

    }, {
        // Options
        tableName: 'Event_Categories'
    });

    return EventCategory

}