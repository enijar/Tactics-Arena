const Player = require('../../../models/Player');
const connectedPlayers = require('../../../state/connectedPlayers');
const Command = require('./Command');

module.exports = class ChallengeCommand extends Command {
    constructor(player, args = []) {
        super(player, args);
    }

    async run() {
        const playerName = this.getArg(0);

        if (!playerName) {
            return "You need to specify a player name, e.g. /challenge player";
        }

        if (playerName.toLowerCase() === this.player.name.toLowerCase()) {
            return "You can't challenge yourself to a game";
        }

        const player = await Player.findOne({where: {name: playerName}});

        if (!player) {
            return `Player ${playerName} doesn't exist`;
        }

        const challengedPlayer = connectedPlayers.findById(player.id);

        if (!challengedPlayer) {
            return `Player ${playerName} isn't online`;
        }

        if (challengedPlayer.public.status !== 'in-game') {
            return "Place your avatar on a tile";
        }

        return "Can't do that now, try again later";
    }
};
