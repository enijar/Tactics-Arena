const common = require('../../common/config');
const server = require('./server');
const paths = require('./paths');
const hashing = require('./hashing');
const database = require('./database');
const log = require('./log');

module.exports = {
    common,
    server,
    paths,
    hashing,
    database,
    log
};
