// This user has connected
const connected = socket => {
    console.info('TODO: Handle user connecting', socket);
};

// This user has disconnected
const disconnect = () => {
    console.info('TODO: Handle this user disconnecting');
};

// Other user has disconnected
const disconnected = socket => {
    console.info('TODO: Handle other user disconnecting', socket);
};

const listeners = {
    connected,
    disconnect,
    disconnected,
};

export default props => socket => {
    return {
        on() {
            console.log(props);

            for (let listener in listeners) {
                if (listeners.hasOwnProperty(listener)) {
                    socket.on(listener, listeners[listener]);
                }
            }
        },
        off() {
            for (let listener in listeners) {
                if (listeners.hasOwnProperty(listener)) {
                    socket.off(listener, listeners[listener]);
                }
            }
        }
    }
}
