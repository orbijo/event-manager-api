const EventCategory = require("./EventCategory");

module.exports = (sequelize, DataTypes) => {
    
    const EventParticipant = sequelize.define('EventParticipant', {
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
        participant_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        attendedAt: DataTypes.DATE,
        // timestamps enabled by default in sequelize
        
        
    }, {
        // Options
        paranoid: true, //deleted at
        tableName: 'Event_Participants'
    });

    return EventParticipant

}