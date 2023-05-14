module.exports = (sequelize, DataTypes) => {

    const Event = sequelize.define('Event',{
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule: {
            type: DataTypes.DATE,
            allowNull: false
        },

    }, {
        paranoid: true
    });

    Event.associate = (models) => {
        Event.hasMany(models.Schedule, {
            onUpdate: "cascade"
        })
        Event.belongsTo(models.User, {
            as: 'Organizer'
        })
        Event.belongsTo(models.User, {
            as: 'Approver'
        })
    }

    return Event
}