const state = require('../../state/index');
const auth = require('../../services/auth');

module.exports = async player => {
    if (!auth.check(player)) {
        return;
    }

    player = state.connectedPlayers.find(player.socketId);
    player && player.resetIdleTimeout();
};
