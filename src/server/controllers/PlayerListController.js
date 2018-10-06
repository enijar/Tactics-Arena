module.exports = (req, res) => {
    const players = [
        {
            id: 1,
            username: 'Enijar',
            status: 'online'
        },
        {
            id: 2,
            username: 'Bot',
            status: 'idle'
        }
    ];

    for (let i = 0; i < 20; i++) {
        players.push({
            id: players.length + 1,
            username: `username-${players.length + 1}`,
            status: 'online'
        });
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(players));
};
