const path = require('path');
const env = require('../../env/server');
const common = require('../common/config');
const basePath = path.resolve(__dirname, '..', '..');

module.exports = {
    key: env.key,
    path: {
        base: basePath,
        public: path.join(basePath, 'public'),
    },
    database: {
        dialect: env.dbDialect,
        name: env.dbName,
        username: env.dbUsername,
        password: env.dbPassword,
        host: env.dbHost,
    },
    cacheServers: ['localhost:11211'],
    saltRounds: 10,
    common,
    cacheExpireTime: 1000 * 60 * 60 * 24, // 1 day
    tokenExpireTime: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
    loginAttemptsThrottle: 5,
    idlePlayerTimeout: 10000, // 10 seconds
};
