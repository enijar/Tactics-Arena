const state = require('../state/index');
const Player = require('../objects/Player');
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

        state.players.push(new Player({...user, status: 'active', io, socket}));

        next();
    });

    io.on('connection', socket => {
        require('./verify')(io, socket);
        require('./chat')(io, socket);

        socket.on('players.get', () => {
            socket.emit('players.update', state.players.map(player => player.get()));
        });

        socket.on('disconnect', () => {
            for (let i = state.players.length - 1; i >= 0; i++) {
                if (state.players[i].socketId === socket.id) {
                    const player = state.players[i];
                    state.players.splice(i, 1);
                    player.destroy();
                    break;
                }
            }
        });
    });
};
