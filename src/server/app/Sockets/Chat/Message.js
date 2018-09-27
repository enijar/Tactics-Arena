import ChatCommands from "../../Functions/Chat/Commands/index";
import VerifyUser from "../../Functions/Auth/VerifyUser";

export default (io, socket) => {
    socket.on('message', data => {
        if (!VerifyUser(data.user)) {
            console.info(`Unauthorized access for ${data.user.name}`);
            socket.disconnect();
            return;
        }

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
