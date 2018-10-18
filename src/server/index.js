const ClusterWS = require('clusterws');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./services/db');
const socket = require('./socket/index');

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
            this.wss.setMiddleware('verifyConnection', socket.verify);
            this.wss.on('connection', socket.connection);
        },
    });

    await db.sync();
})();
