import ChatSocket from "./ChatSocket";

export default (io, socket) => {
    socket.on('disconnect', () => io.emit('disconnected'));

    ChatSocket(io, socket);
}
