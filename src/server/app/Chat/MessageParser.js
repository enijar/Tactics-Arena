const commands = require('./Commands/index');

module.exports = class MessageParser {
    constructor(player, message) {
        this.player = player;
        this.message = message;
    }

    async parse() {
        let type = 'default';
        let text = String(this.message || '');

        if (text.startsWith('/')) {
            type = 'command';
            const parsed = /^\/(\w+)\s?(.*)/.exec(text);
            const command = parsed[1];
            let args = String(parsed[2] || '');
            args = !args ? [] : args.split(' ');

            if (!command) {
                return {type, text: 'Invalid command'};
            }

            let chatCommand = null;

            // Get matching commandTest RegExp command class instance
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
                return {type, text: 'Invalid command'};
            }

            text = await chatCommand.run();
        }

        return {type, text};
    }
};
