const Player = require('../../../models/Player');
const connectedPlayers = require('../../../state/connectedPlayers');
const Command = require('./Command');

module.exports = class StatCommand extends Command {
    constructor(player, args = []) {
        super(player, args);
    }

    async run() {
        const playerName = this.getArg(0);

        if (!playerName || playerName.toLowerCase() === this.player.name.toLowerCase()) {
            return `Your stats are ${this.player.stat}`;
        }

        const player = await Player.findOne({where: {name: playerName}});

        if (!player) {
            return `Player ${playerName} doesn't exist`;
        }

        const stat = player.stat;
        const playerOnline = !!connectedPlayers.findById(player.id);

        return `[${playerOnline ? 'on' : 'off'}line] ${player.name} has ${stat} stats`;
    }
};
