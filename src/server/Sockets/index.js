import ChatSocket from "./ChatSocket";
import GetSocket from "../Functions/Socket/GetSocket";

export default (io, socket) => {
    socket.on('disconnect', () => {
        io.emit('disconnected', GetSocket(socket));
    });

    io.emit('connected', GetSocket(socket));

    ChatSocket(io, socket);
}
