import ChatCommands from "../../Functions/Chat/Commands/index";

export default (io, socket) => {
    socket.on('message', data => {
        const date = new Date();
        const command = ChatCommands(data.text);

        data.time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        data.type = command !== null ? 'command' : 'user';

        if (data.type === 'command') {
            data.text = command;
            socket.emit('message', data);
        } else {
            io.emit('message', data);
        }
    });
}
