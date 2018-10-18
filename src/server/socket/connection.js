const state = require('../state/index');
const ConnectedPlayer = require('../models/ConnectedPlayer');

/**
 * Verify the connection by validating the given player's JWT
 * matches the cached player's JWT.
 *
 * @param {Object} socket
 * @returns {Promise<*>}
 */
module.exports = socket => {
    socket.on('connect', player => {
        state.connectedPlayers.add(socket.id, new ConnectedPlayer(socket.id, player.id));
        console.log(`${state.connectedPlayers.all().length} players connected`);
    });

    socket.on('disconnect', () => {
        state.connectedPlayers.remove(socket.id);
        console.log(`${state.connectedPlayers.all().length} players connected`);
    });
};
