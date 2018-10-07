const User = require('../../models/User');

/**
 * Return current player stats or queried player stats
 *
 * @param {Object} user
 * @param {String} playerName
 * @returns {Object}
 */
module.exports = async (user, playerName = null) => {
    playerName = playerName || user.name;
    const player = await User.findOne({where: {name: playerName}});

    if (!player) {
        return {
            public: false,
            type: 'command',
            text: `
                *** ${playerName} is not rated ***
            `
        };
    }

    const stat = player.stat || 0;

    return {
        public: false,
        type: 'command',
        text: `
            *** ${playerName === user.name ? `You are rated ${stat}` : `${player.name} is rated ${stat}`} ***
        `
    };
};
