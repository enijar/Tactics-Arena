module.exports = class ConnectedPlayer {
    constructor(socketId, player, status = 'active') {
        Object.assign(this, player);
        this.socketId = socketId;
        this.status = status;
    }
};
