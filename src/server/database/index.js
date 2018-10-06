const Sequelize = require('sequelize');
const config = require('../config/index');

module.exports = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    logging: false
});
