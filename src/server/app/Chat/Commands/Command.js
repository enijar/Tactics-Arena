module.exports = class Command {
    constructor(player, args = []) {
        this.player = player;
        this.args = args;
    }

    /**
     * Execute this command and wait for the message value to
     * be return.
     *
     * @returns {Promise<string>}
     */
    async run() {
        return '';
    }

    /**
     * Get the arg value from the args array by the given
     * index or return the given default value if no arg
     * exists in the args array.
     *
     * @param {Number} index
     * @param {*|null} defaultValue
     * @returns {*|defaultValue}
     */
    getArg(index, defaultValue = null) {
        if (!this.args[index]) {
            return defaultValue;
        }
        return this.args[index];
    }
};
