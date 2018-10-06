module.exports = (io, socket) => {
    socket.on('chat.message', data => {
        const date = new Date();
        const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        io.emit('chat.message', {
            time,
            message: data.message,
            user: {
                name: data.user.name
            }
        });
    });
};
