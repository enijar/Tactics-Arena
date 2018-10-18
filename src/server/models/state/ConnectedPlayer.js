const config = require('../../config');

module.exports = class ConnectedPlayer {
    constructor(socket, player, status = 'active') {
        this.data = Object.assign({status}, player);
        this.socket = socket;
        this.resetIdleTimeout();
    }

    resetIdleTimeout() {
        this.data.status = 'active';

        setTimeout(() => {
            this.data.status = 'idle';
            this.socket.send('player.update', this.data);
        }, config.idlePlayerTimeout);
    }
};
