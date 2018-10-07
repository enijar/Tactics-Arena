const state = require('../../state/index');

/**
 * Get an array of player objects from the players state.
 *
 * @returns {Array}
 */
module.exports = () => {
    const players = [];

    for (let socketId in state.players) {
        if (!state.players.hasOwnProperty(socketId)) {
            continue;
        }
        players.push(state.players[socketId].get());
    }

    return players;
};
