const state = require('../../state/index');
const auth = require('../../services/auth');

/**
 *
 * @param {Object} wss
 * @param {Object} socket
 * @param {Object} payload
 * @returns {Promise<void>}
 */
module.exports = async (wss, socket, payload) => {
    if (!await auth.check(payload.player)) {
        return;
    }

    const player = state.connectedPlayers.find(socket.id);
    player && player.resetIdleTimeout();
};
