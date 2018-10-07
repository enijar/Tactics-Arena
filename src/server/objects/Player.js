const Logger = require('../functions/Logger');
const state = require('../state/index');
const config = require('../config/index');

/**
 * Object instance of a connected player.
 *
 * @type {module.Player}
 */
module.exports = class Player {
    constructor(props) {
        Object.assign(this, props);
        this.idleTimeout = null;
    }

    /**
     * Reset the timeout, indicating if this user is idle.
     */
    resetIdleTimeout() {
        Logger.info(`Player.resetIdleTimeout(active) -> ${this.name}`);

        for (let i = 0; i < state.players.length; i++) {
            if (state.players[i].name === this.name) {
                state.players[i].status = 'active';
                break;
            }
        }

        this.io.emit('players.update', state.players.map(player => player.get()));

        this.idleTimeout && clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            Logger.info(`Player.resetIdleTimeout(idle) -> ${this.name}`);

            for (let i = 0; i < state.players.length; i++) {
                if (state.players[i].name === this.name) {
                    state.players[i].status = 'idle';
                    break;
                }
            }
            this.io.emit('players.update', state.players.map(player => player.get()));
        }, config.player.idleTimeout);
    }

    /**
     * Clear timeouts and emit the players.update event.
     */
    destroy() {
        Logger.info(`Player.destroy -> ${this.name}`);
        this.idleTimeout && clearTimeout(this.idleTimeout);
        this.io.emit('players.update', state.players.map(player => player.get()));
    }

    /**
     * Publicly visible data
     *
     * @returns {Object}
     */
    get() {
        return {
            id: this.id,
            name: this.name,
            status: this.status
        };
    }
};
