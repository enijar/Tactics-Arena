const Memcached = require('memcached');
const config = require('../config');

const provider = new Memcached(config.cacheServers);

module.exports = {
    set(key, value, expireTime = config.cacheExpireTime) {
        return new Promise((resolve, reject) => {
            provider.set(key, value, expireTime / 1000, err => {
                err ? reject(err) : resolve();
            });
        });
    },
    get(key, defaultValue = null) {
        return new Promise(resolve => {
            if (Array.isArray(key)) {
                return provider.getMulti(key, (err, values) => {
                    resolve(err || value === undefined ? defaultValue : values);
                });
            }

            provider.get(key, (err, value) => {
                resolve(err || value === undefined ? defaultValue : value);
            });
        });
    },
    has(key) {
        return new Promise(resolve => {
            provider.get(key, err => resolve(!err));
        });
    },
};
