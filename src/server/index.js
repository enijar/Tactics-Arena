const ClusterWS = require('clusterws');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./services/db');
const state = require('./state/index');
const Game = require('./models/state/Game');

(async () => {
    new ClusterWS({
        port: config.port,
        worker: function () {
            const app = express();

            app.use(bodyParser.json());
            app.use(express.static(config.path.public));
            app.use(bodyParser.urlencoded({extended: true}));

            require('./routes')(app);

            this.server.on('request', app);
            this.wss.setMiddleware('verifyConnection', require('./sockets/middleware/verifyConnection'));
            this.wss.on('connection', socket => require('./sockets/index')(this.wss, socket));
        },
    });

    // Fill the games state with empty games. These will be updated when
    // players interact with them via the lobby and to keep track of
    // in-game state.
    let id = 0;
    for (let floor = 1; floor <= config.common.floors; floor++) {
        for (let arena = 1; arena <= config.common.arenas; arena++) {
            id++;
            state.games.add(id, new Game(id, floor, arena));
        }
    }

    await db.sync();
})();
