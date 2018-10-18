const config = require('../../config');
const state = require('../../state/index');

module.exports = class ConnectedPlayer {
    constructor(wss, socket, token, player, game = null, status = 'active') {
        this.public = player.public();
        this.public.status = status;
        this.player = player;
        this.game = game;
        this.wss = wss;
        this.socket = socket;
        this.token = token;
        this.timeout = null;
        this.resetIdleTimeout();
    }

    resetIdleTimeout() {
        this.public.status = 'active';
        this.wss.publish('player.activity', this.public);

        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.public.status = 'idle';
            this.wss.publish('player.activity', this.public);
        }, config.idlePlayerTimeout);
    }

    joinGame(game) {
        this.game = game;
    }

    leaveGame() {
        this.game = null;
    }
};
