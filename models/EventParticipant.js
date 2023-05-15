const EventCategory = require("./EventCategory");

module.exports = (sequelize, DataTypes) => {
    
    const EventParticipant = sequelize.define('EventParticipant', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        attendedAt: DataTypes.DATE,
        // timestamps enabled by default in sequelize
        
        
    }, {
        // Options
        tableName: 'Event_Participants'
    });

    return EventParticipant

}