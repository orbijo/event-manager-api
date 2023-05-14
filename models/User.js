module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        // Model attributes:
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_num: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middle_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        email_verified_at: DataTypes.DATE,
        // timestamps enabled by default in sequelize
        

    }, {
        paranoid: true  //deleted at
    });

    User.associate = (models) => {
        User.belongsToMany(models.Event, {
            through: 'EventParticipant',
            as: 'ParticipatedEvents'
        });
        User.belongsToMany(models.Role, {
            through: 'UserRole',
            as: 'roles'
        });
    };

    User.prototype.fetchRoles = async function () {
        const roles = await this.getRoles();
        return roles;
    };

    return User

}