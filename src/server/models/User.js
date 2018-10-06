const Sequelize = require('sequelize');
const database = require('../database/index');

const User = database.define('user', {
    name: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

User.prototype.json = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = User;
