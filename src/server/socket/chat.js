const Logger = require('../functions/Logger');
const state = require('../state/index');

module.exports = (io, socket) => {
    socket.on('chat.message', data => {
        const date = new Date();
        const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        Logger.info(`Message from "${data.user.name}" saying "${data.message}"`);

        io.emit('chat.message', {
            time,
            message: data.message,
            user: state.players[socket.id].get()
        });
    });
};
