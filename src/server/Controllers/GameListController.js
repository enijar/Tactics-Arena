const FLOORS = 10;
const ARENAS = 10;

export default (req, res) => {
    const games = [];

    let id = 0;

    for (let i = 1; i <= FLOORS; i++) {
        for (let j = 1; j <= ARENAS; j++) {
            games.push({
                id: ++id,
                arena: j,
                floor: i,
                players: []
            });
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(games));
}
