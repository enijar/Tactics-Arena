import HelpCommand from "./HelpCommand";

const commands = {
    help: HelpCommand
};

export default message => {
    message = message.replace(/^[\s\n]+/, '').replace(/\s+/, ' ');

    let [command, args] = message.split(/^\/w+/);

    const isCommand = command.match(/^\//);

    command = command.replace(/^\//, '');
    command = (command || '').toLowerCase();
    args = (args || '').split(' ');

    if (!commands.hasOwnProperty(command)) {
        return null;
    }

    return isCommand ? commands[command](args) : null;
}
