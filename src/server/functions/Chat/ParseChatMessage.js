const GetPublicPlayerObject = require('../Player/GetPublicPlayerObject');
const ChatCommands = require('../../components/ChatCommands/index');

const COMMAND_REGEX = /^\/(\w+) ?(.+)?/;

/**
 * @param {Object} socket
 * @param {Object} data
 * @returns {Object}
 */
module.exports = async (socket, data) => {
    const user = GetPublicPlayerObject(data.user, socket.id);

    if (!user) {
        return {user, message: data.message};
    }

    let message = {
        public: true,
        type: 'text',
        text: data.message
    };

    if (COMMAND_REGEX.test(data.message)) {
        const match = COMMAND_REGEX.exec(data.message);
        const command = match[1];
        const args = (match[2] || '').trim().split(/\s+/);
        const result = await ChatCommands(user, command, args);

        if (result) {
            message = result;
        }
    }

    return {user, message}
};
