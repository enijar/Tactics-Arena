module.exports = class Command {
    constructor(player, args = []) {
        this.player = player;
        this.args = args;
    }

    async run() {
        return '';
    }
};
