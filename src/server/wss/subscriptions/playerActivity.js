const state = require('../../state/index');
const cache = require('../../services/cache');

module.exports = async player => {
    // Check given player.token matches cached player.token
    const cachedPlayer = JSON.parse(await cache.get(`player.${player.id}`));
    if (!cachedPlayer || cachedPlayer.token !== player.token) {
        return;
    }

    player = state.connectedPlayers.find(player.socketId);
    player && player.resetIdleTimeout();
};
