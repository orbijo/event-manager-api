module.exports = (sequelize, DataTypes) => {
    
    const EventCategory = sequelize.define('EventCategory', {
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
        category_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
    }, {
        // Options
        paranoid: true, //deleted at
        tableName: 'Event_Categories'
    });

    return EventCategory

}