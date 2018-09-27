import ChatCommands from "../../Functions/Chat/Commands/index";
import VerifyUser from "../../Functions/Auth/VerifyUser";
import LogInfo from "../../Functions/Logger/LogInfo";

export default (io, socket) => {
    socket.on('message', data => {
        if (!VerifyUser(data.user)) {
            LogInfo({message: 'Unauthorized access', user: data.user});
            socket.disconnect();
            return;
        }

        const date = new Date();
        const command = ChatCommands(data.text);
        const type = command !== null ? 'command' : 'user';

        const response = {
            time: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
            type,
            text: type === 'command' ? command : data.text,
            user: {
                id: data.user.id,
                name: data.user.name
            }
        };

        if (type === 'command') {
            socket.emit('message', response);
        } else {
            io.emit('message', response);
        }
    });
}
