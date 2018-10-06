const Logger = require('../functions/Logger');
const VerifyUser = require('../functions/VerifyUser');
const AddSocketIdToUserTokens = require('../functions/AddSocketIdToUserTokens');

module.exports = io => {
    io.use((socket, next) => {
        let user = JSON.parse(socket.handshake.query.user) || null;

        if (!user) {
            socket.disconnect();
            Logger.info('No user sent with socket handshake');
            return false;
        }

        if (!VerifyUser(user)) {
            socket.disconnect();
            Logger.info(`Unverified user "${user.name}"`);
            return;
        }

        // Store the connected user's socketId and emit to the
        // client that this user is connected.
        user.socketId = socket.id;
        AddSocketIdToUserTokens(user);
        socket.emit('connected', user);
        Logger.info(`connection.user "${user.name}" -> "${user.socketId}"`);

        next();
    });

    io.on('connection', socket => {
        require('./verify')(io, socket);
        require('./chat')(io, socket);
    });
};
