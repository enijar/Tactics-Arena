const Sequelize = require('sequelize');
const config = require('../config/index');
const models = require('../models/index');
const db = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    logging: false,
});

for (let model in models) {
    if (!models.hasOwnProperty(model)) {
        continue;
    }

    models[model] = models[model].init(db, Sequelize);
}

module.exports = db;
