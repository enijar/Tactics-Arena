const config = require('../config/index');

module.exports = (req, res) => {
    const games = [];

    let id = 0;

    for (let i = 1; i <= config.common.floors; i++) {
        for (let j = 1; j <= config.common.arenas; j++) {
            games.push({
                id: ++id,
                arena: j,
                floor: i,
                players: []
            });
        }
    }

    games[0].players = [
        {
            id: 1,
            username: 'Enijar',
            position: 'top'
        }
    ];

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(games));
};
