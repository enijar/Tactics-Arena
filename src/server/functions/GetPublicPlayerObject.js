const state = require('../state/index');

module.exports = (user, socketId) => {
    if (!state.players.hasOwnProperty(socketId)) {
        return false;
    }

    if (state.players[socketId].jwt !== user.jwt) {
        return false;
    }

    return state.players[socketId].get();
};
