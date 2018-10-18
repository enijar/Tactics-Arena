module.exports = class ConnectedPlayer {
    constructor(socketId, playerId) {
        this.sockedId = socketId;
        this.playerId = playerId;
    }
};
