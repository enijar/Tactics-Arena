const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('../config/index');

/**
 * @type {Sequelize.Model}
 */
module.exports = class User extends Sequelize.Model {
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
                tableName: 'users',
                sequelize,
            },
        );
    }

    json() {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }

    /**
     * Save the given token to the tokens.json file in the storage directory.
     *
     * @param {String} token
     */
    saveToken(token) {
        // Create tokensFile file if it doesn't already exist
        const tokensFile = path.join(config.paths.storage, 'tokens.json');
        if (!fs.existsSync(tokensFile)) {
            fs.writeFileSync(tokensFile, JSON.stringify({}), 'utf-8');
        }

        // Save given user.id and token to tokensFile file
        const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8')) || {};
        tokens[this.id] = {
            name: this.name,
            jwt: token,
        };
        fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));
    }
};
