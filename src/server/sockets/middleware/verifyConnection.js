const cache = require('../../services/cache');
const state = require('../../state/index');

/**
 * Verify the connection by validating the given player's JWT
 * matches the cached player's JWT.
 *
 * @param {Object} info
 * @param {Function} next
 * @returns {Promise<*>}
 */
module.exports = async (info, next) => {
    const player = JSON.parse(decodeURI(info.req.url).replace(/^\/+/, '') || null);

    if (!player) {
        return next(false);
    }

    // Check cached player.token matched the given player.token
    const {token} = JSON.parse(await cache.get(`player.${player.id}`, '{token: null}'));
    if (player.token !== token) {
        return next(false);
    }

    // Disallow a player trying to start multiple connections on the same account
    const connectedPlayer = state.connectedPlayers.findById(player.id);
    if (connectedPlayer !== null) {
        return next(false);
    }

    next(true);
};
