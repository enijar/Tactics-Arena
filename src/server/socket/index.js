const state = require('../state/index');
const Player = require('../objects/Player');
const Logger = require('../functions/Logger');
const VerifyUser = require('../functions/VerifyUser');
const AddSocketIdToUserTokens = require('../functions/AddSocketIdToUserTokens');
const GetPlayersFromState = require('../functions/Player/GetPlayersFromState');

module.exports = io => {
    io.use((socket, next) => {
        let user = null;

        try {
            user = JSON.parse(socket.handshake.query.user) || null;
        } catch (err) {
            Logger.error(err);
        }

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

        state.players[user.socketId] = new Player({...user, status: 'active', io, socket});

        next();
    });

    io.on('connection', socket => {
        require('./verify')(io, socket);
        require('./chat')(io, socket);

        socket.on('players.get', () => {
            socket.emit('players.update', GetPlayersFromState());
        });

        socket.on('disconnect', () => {
            // Remove player from state
            if (!state.players.hasOwnProperty(socket.id)) {
                Logger.info(`No player found in state with socket ID "${socket.id}"`);
                return;
            }
            state.players[socket.id].destroy();
            delete state.players[socket.id];
            io.emit('players.update', GetPlayersFromState());
        });
    });
};
