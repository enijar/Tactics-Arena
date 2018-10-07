const GetPlayerStat = require('./GetPlayerStat');

/**
 * @param {String} command
 * @param {Object} user
 * @param {Array} args
 * @returns {Object|Boolean}
 */
module.exports = async (user, command, args = []) => {
    const commands = {
        [/^stats?$/]: GetPlayerStat
    };

    for (let pattern in commands) {
        if (!commands.hasOwnProperty(pattern)) {
            continue;
        }

        if (pattern.match(command)) {
            return await commands[pattern](user, ...args);
        }
    }

    return false;
};
