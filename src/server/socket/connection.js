const Logger = require('../functions/Logger');

module.exports = io => {
    io.on('connection', socket => {
        Logger.info(`socket connection ${socket.id}`);
    });
};
