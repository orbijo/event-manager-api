module.exports = (sequelize, DataTypes) => {

    const Event = sequelize.define('Event',{
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        organizer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        approver_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    });

    return Event
}