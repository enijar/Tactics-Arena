const path = require('path');
const winston = require('winston');
const config = require('../config/index');

const format = winston.format.printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

/**
 * @type {winston.Logger}
 */
module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        format
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: path.join(config.paths.storage, 'app.log'),
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 2,
            tailable: true
        })
    ]
});
