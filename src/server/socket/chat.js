const Logger = require('../functions/Logger');
const ParseChatMessage = require('../functions/Chat/ParseChatMessage');

module.exports = (io, socket) => {
    socket.on('chat.message', async data => {
        const {message, user} = await ParseChatMessage(socket, data);

        if (!user) {
            Logger.info(`Unauthorized user message from "${data.user.name}" attempting to say "${data.message}"`);
            return;
        }

        Logger.info(`Message from "${data.user.name}" saying "${message.text}"`);

        if (message.public) {
            io.emit('chat.message', {message, user});
            return;
        }

        socket.emit('chat.message', {message, user});
    });
};
