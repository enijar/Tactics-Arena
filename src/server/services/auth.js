const cache = require('./cache');

module.exports = {
    /**
     * Check given player token matches cached player token.
     *
     * @param {Object} player
     * @returns {Promise<boolean>}
     */
    async check(player) {
        const cachedPlayer = JSON.parse(await cache.get(`player.${player.id}`));
        return (cachedPlayer && cachedPlayer.token === player.token);
    }
};
