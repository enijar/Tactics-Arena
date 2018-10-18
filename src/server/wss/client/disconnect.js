const state = require('../../state/index');

/**
 * @param {Object} wss
 * @param {Object} socket
 */
module.exports = (wss, socket) => {
    const connectedPlayer = state.connectedPlayers.find(socket.id);

    state.connectedPlayers.remove(socket.id);
    wss.publish('player.disconnect', connectedPlayer.public);
    console.log(`${state.connectedPlayers.all().length} players connected`);
};
