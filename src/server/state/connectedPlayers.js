module.exports = {
    players: {},
    all() {
        const players = [];
        for (let socketId in this.players) {
            if (!this.players.hasOwnProperty(socketId)) {
                continue;
            }
            players.push(this.players[socketId]);
        }
        return players;
    },
    find(socketId, defaultValue = null) {
        if (!this.players.hasOwnProperty(socketId)) {
            return defaultValue;
        }
        return this.players[socketId];
    },
    add(socketId, player) {
        this.players[socketId] = player;
    },
    remove(socketId) {
        if (this.players.hasOwnProperty(socketId)) {
            delete this.players[socketId];
        }
    }
};
