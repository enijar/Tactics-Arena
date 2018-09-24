import io from "socket.io-client";
import listeners from "./listeners";

export default {
    socket: null,
    listeners,
    connect() {
        this.socket = io();
        this.listeners(this.socket).on();
        return this.socket;
    },
    disconnect() {
        this.listeners(this.socket).off();
        this.socket.disconnect();
        this.socket = null;
        return this.socket;
    }
};
