const events = {
    'connect': require('./client/connect'),
    'disconnect': require('./client/disconnect'),
    'player.activity': require('./subscriptions/playerActivity'),
    'game.activity': require('./subscriptions/gameActivity'),
    'chat.lobby': require('./subscriptions/chat/lobby'),
};

module.exports = (wss, socket) => {
    for (let event in events) {
        if (!events.hasOwnProperty(event)) {
            continue;
        }

        socket.on(event, (payload = {}) => {
            events[event](wss, socket, payload);
        });
    }
};
