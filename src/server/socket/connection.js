const state = require('../state/index');
const ConnectedPlayer = require('../models/state/ConnectedPlayer');
const Player = require('../models/Player');

const logConnectedPlayers = () => {
    console.log(`${state.connectedPlayers.all().length} players connected`);
};

/**
 * Verify the connection by validating the given player's JWT
 * matches the cached player's JWT.
 *
 * @param {Object} socket
 * @returns {Promise<*>}
 */
module.exports = socket => {
    socket.on('connect', player => {
        (async () => {
            try {
                player = await Player.findOne({where: {name: player.name}});

                state.connectedPlayers.add(socket.id, new ConnectedPlayer(socket, player.public()));
                logConnectedPlayers();

                socket.send('players', state.connectedPlayers.all().map(player => player.data));
                socket.send('games', state.games.all());
            } catch (err) {
                console.error(err.message);
            }
        })();
    });

    socket.on('disconnect', () => {
        state.connectedPlayers.remove(socket.id);
        logConnectedPlayers();
    });
};
