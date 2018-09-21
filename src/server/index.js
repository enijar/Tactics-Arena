import "babel-polyfill";
import express from "express";
import {Server} from "http";
import socket from "socket.io";
import bodyParser from "body-parser";
import config from "./config/index";
import Sockets from "./Sockets/index";

const app = express();
const server = Server(app);
const io = socket(server);

app.use(bodyParser.json());
app.use(express.static(config.paths.public));
app.use(bodyParser.urlencoded({extended: true}));

config.routes(app);

io.on('connection', socket => Sockets(io, socket));

server.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
});
