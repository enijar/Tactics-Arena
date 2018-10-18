const Sequelize = require('sequelize');

module.exports = class Player extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING(15),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'gray',
                },
                stat: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 750,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                tableName: 'players',
                sequelize,
            },
        );
    }

    json(attributes = {}) {
        const values = Object.assign(attributes, this.get());
        delete values.password;
        return values;
    }
};
