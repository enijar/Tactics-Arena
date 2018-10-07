const Logger = require('../functions/Logger');
const GetPublicPlayerObject = require('../functions/GetPublicPlayerObject');

module.exports = (io, socket) => {
    socket.on('chat.message', data => {
        const user = GetPublicPlayerObject(data.user, socket.id);

        if (!user) {
            Logger.info(`Unauthorized user message from "${data.user.name}" saying "${data.message}"`);
            return;
        }

        Logger.info(`Message from "${data.user.name}" saying "${data.message}"`);
        io.emit('chat.message', {message: data.message, user});
    });
};
