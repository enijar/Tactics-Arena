const state = require('../state/index');
const config = require('../config/index');

module.exports = class Player {
    constructor(props) {
        Object.assign(this, props);
        this.idleTimeout = null;

        this.resetIdleTimeout();
    }

    resetIdleTimeout() {
        for (let i = 0; i < state.players.length; i++) {
            if (state.players[i].name === this.name) {
                state.players[i].status = 'active';
                break;
            }
        }

        this.io.emit('players.update', state.players.map(player => player.get()));

        this.idleTimeout && clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            for (let i = 0; i < state.players.length; i++) {
                if (state.players[i].name === this.name) {
                    state.players[i].status = 'idle';
                    break;
                }
            }
            this.io.emit('players.update', state.players.map(player => player.get()));
        }, config.player.idleTimeout);
    }

    destroy() {
        this.idleTimeout && clearTimeout(this.idleTimeout);
        this.io.emit('players.update', state.players.map(player => player.get()));
    }

    get() {
        return {
            id: this.id,
            name: this.name,
            status: this.status
        };
    }
};
