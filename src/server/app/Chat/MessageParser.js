const commands = require('./Commands/index');

const returnCommand = text => ({type: 'command', text});

module.exports = class MessageParser {
    constructor(player, message = '') {
        this.player = player;
        this.message = String(message);
    }

    async parse() {
        if (!this.message.startsWith('/')) {
            return {
                type: this.player.type,
                text: this.message,
            };
        }

        const parsed = /^\/(\w+)\s?(.*)/.exec(this.message);
        const command = parsed[1];
        const args = !parsed[2] ? [] : parsed[2].split(' ');

        if (!command) {
            return returnCommand('Invalid command');
        }

        let chatCommand = null;

        // Get command class from matching command RegExp test keys
        for (let commandTest in commands) {
            if (!commands.hasOwnProperty(commandTest)) {
                continue;
            }

            if (command.match(new RegExp(commandTest))) {
                chatCommand = new commands[commandTest](this.player, args);
                break;
            }
        }

        if (!chatCommand) {
            return returnCommand('Invalid command');
        }

        return returnCommand(await chatCommand.run());
    }
};
