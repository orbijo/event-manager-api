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
        about: {
            type: DataTypes.TEXT
        },
        schedule: {
            type: DataTypes.DATE,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    });

    Event.associate = (models) => {
        Event.hasMany(models.Schedule, {
            onUpdate: 'cascade'
        });
        Event.belongsTo(models.User, {
            as: 'Organizer'
        });
        Event.belongsTo(models.User, {
            as: 'Approver'
        });
        Event.belongsToMany(models.User, {
            through: 'EventParticipant',
            as: 'EventParticipants'
        });
    };

    return Event
}