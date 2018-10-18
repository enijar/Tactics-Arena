const state = require('../../state/index');
const cache = require('../../services/cache');

module.exports = async (wss, {position, game, player}) => {
    // Check given player.token matches cached player.token
    const cachedPlayer = JSON.parse(await cache.get(`player.${player.id}`));
    if (!cachedPlayer || cachedPlayer.token !== player.token) {
        return;
    }

    const connectedPlayer = state.connectedPlayers.find(player.socketId);

    if (!player || !state.games.find(game.id)) {
        return;
    }

    const lastGame = connectedPlayer.game;
    const samePosition = lastGame && lastGame.players.find(p => p.position === position);
    player = connectedPlayer.public;
    player.position = position;
    game = state.games.find(game.id);

    // Don't allow this player to join the tile of another player
    if (game.players.find(p => p.id !== player.id && p.position === position)) {
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
