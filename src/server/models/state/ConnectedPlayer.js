module.exports = class ConnectedPlayer {
    constructor(socketId, playerId) {
        this.socketId = socketId;
        this.playerId = playerId;
    }
};
