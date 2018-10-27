const state = require('../../state/index');
const auth = require('../../services/auth');

/**
 * @param {Object} wss
 * @param {Object} socket
 * @param {Object} payload
 * @returns {Promise<void>}
 */
module.exports = async (wss, socket, payload) => {
    if (!await auth.check(payload.player)) {
        return;
    }

    const connectedPlayer = state.connectedPlayers.find(socket.id);

    if (!payload.player || !state.games.find(payload.data.game.id)) {
        return;
    }

    const lastGame = connectedPlayer.game;
    const samePosition = lastGame && lastGame.players.find(p => p.position === payload.data.position);
    const player = connectedPlayer.public;
    const game = state.games.find(payload.data.game.id);
    player.position = payload.data.position;

    // Don't allow this player to join the tile of another player
    if (game.players.find(p => p.id !== player.id && p.position === payload.data.position)) {
        return;
    }

    if (lastGame) {
        connectedPlayer.leaveGame();
        lastGame.removePlayer(player);
        wss.publish('game.activity', lastGame);

        if (lastGame.id === game.id && samePosition) {
            return;
        }
    }

    connectedPlayer.joinGame(game);
    game.addPlayer(player);
    wss.publish('game.activity', game);
};
