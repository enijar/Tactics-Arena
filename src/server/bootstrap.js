const io = require('socket.io');
const express = require('express');
const {Server} = require('http');
const bodyParser = require('body-parser');
const config = require('./config/index');

const app = express();
const server = Server(app);
const socket = io(server);

app.use(bodyParser.json());
app.use(express.static(config.paths.public));
app.use(bodyParser.urlencoded({extended: true}));

module.exports = {
    app,
    server,
    socket
};
