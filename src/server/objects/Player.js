const Logger = require('../functions/Logger');
const GetPlayersFromState = require('../functions/GetPlayersFromState');
const state = require('../state/index');
const config = require('../config/index');

/**
 * Object instance of a connected player.
 *
 * @type {module.Player}
 */
module.exports = class Player {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.status = props.status;
        this.jwt = props.jwt;
        this.io = props.io;
        this.socket = props.socket;
        this.idleTimeout = null;
    }

    /**
     * Reset the timeout, indicating if this user is idle.
     */
    resetIdleTimeout() {
        Logger.info(`Player.resetIdleTimeout(active) -> ${this.name}`);

        if (state.players.hasOwnProperty(this.socket.id)) {
            state.players[this.socket.id].status = 'active';
        }

        this.io.emit('players.update', GetPlayersFromState());

        this.idleTimeout && clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            Logger.info(`Player.resetIdleTimeout(idle) -> ${this.name}`);

            if (state.players.hasOwnProperty(this.socket.id)) {
                state.players[this.socket.id].status = 'idle';
            }

            this.io.emit('players.update', GetPlayersFromState());
        }, config.player.idleTimeout);
    }

    /**
     * Clear timeouts and emit the players.update event.
     */
    destroy() {
        Logger.info(`Player.destroy -> ${this.name}`);
        this.idleTimeout && clearTimeout(this.idleTimeout);
        this.io.emit('players.update', GetPlayersFromState());
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
            status: this.status,
            type: this.type
        };
    }
};
