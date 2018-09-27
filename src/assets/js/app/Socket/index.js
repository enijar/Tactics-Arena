import io from "socket.io-client";

export default {
    socket: null,
    connect() {
        this.socket = io();
        return this.socket;
    },
    disconnect() {
        this.socket.disconnect();
        this.socket = null;
        return this.socket;
    }
};
