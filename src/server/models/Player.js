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

    constructor(props) {
        super(props);
        this.hiddenFields = ['password'];
        this.publicFields = ['id', 'name', 'type', 'stat'];
    }

    json(attributes = {}) {
        const values = Object.assign(attributes, this.get());
        for (let i = 0; i < this.hiddenFields.length; i++) {
            delete values[this.hiddenFields[i]];
        }
        return values;
    }

    public() {
        const fields = Object.assign({}, this.get());
        const values = {};
        for (let i = 0; i < this.publicFields.length; i++) {
            if (!fields.hasOwnProperty(this.publicFields[i])) {
                continue;
            }
            values[this.publicFields[i]] = fields[this.publicFields[i]];
        }
        return values;
    }
};
