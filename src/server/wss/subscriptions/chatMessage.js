const state = require('../../state/index');
const auth = require('../../services/auth');
const MessageParser = require('../../app/Chat/MessageParser');

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

    const connectedPlayer = state.connectedPlayers.find(payload.player.socketId);
    const {type, text, command} = await (new MessageParser(payload.player, payload.data)).parse();
    const response = {
        player: connectedPlayer.public,
        timestamp: Date.now(),
        type,
        command,
        text,
    };

    if (type === 'command') {
        return socket.send('chat.message', response);
    }

    connectedPlayer && wss.publish('chat.message', response);
};
