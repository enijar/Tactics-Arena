const path = require('path');
const winston = require('winston');
const config = require('../config/index');

module.exports = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: path.join(config.paths.storage, 'app.log'),
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 2,
            colorize: false,
            tailable: true
        })
    ]
});
