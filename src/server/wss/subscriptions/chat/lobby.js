const state = require('../../../state/index');
const auth = require('../../../services/auth');

module.exports = async (wss, {player, message}) => {
    if (!await auth.check(player)) {
        return;
    }

    const connectedPlayer = state.connectedPlayers.find(player.socketId);

    wss.publish('chat.lobby', {
        player: connectedPlayer.public,
        text: message,
    });
};
