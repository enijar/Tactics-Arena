module.exports = {
    players: {},
    all() {
        const connectedPlayers = [];
        for (let socketId in this.players) {
            if (!this.players.hasOwnProperty(socketId)) {
                continue;
            }
            connectedPlayers.push(this.players[socketId]);
        }
        return connectedPlayers;
    },
    find(socketId, defaultValue = null) {
        if (!this.players.hasOwnProperty(socketId)) {
            return defaultValue;
        }
        return this.players[socketId];
    },
    findById(playerId, defaultValue = null) {
        for (let socketId in this.players) {
            if (!this.players.hasOwnProperty(socketId)) {
                continue;
            }
            if (this.players[socketId].public.id === playerId) {
                return this.players[socketId];
            }
        }
        return defaultValue;
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
