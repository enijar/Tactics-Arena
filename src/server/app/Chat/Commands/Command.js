module.exports = class Command {
    constructor(player, args = []) {
        this.player = player;
        this.args = args;
    }

    async run() {
        return '';
    }

    getArg(index, defaultValue = null) {
        if (!this.args[index]) {
            return defaultValue;
        }
        return this.args[index];
    }
};
