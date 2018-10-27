const Command = require('./Command');

module.exports = class PingCommand extends Command {
    constructor(player, args = []) {
        super(player, args);
    }

    async run() {
        return 'pong';
    }
};
