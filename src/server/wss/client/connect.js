const state = require('../../state/index');
const ConnectedPlayer = require('../../models/state/ConnectedPlayer');
const Player = require('../../models/Player');

/**
 * @param {Object} wss
 * @param {Object} socket
 * @param {Object} payload
 * @returns {Promise<*>}
 */
module.exports = async (wss, socket, payload) => {
    let player = payload.data;

    try {
        const {name, token} = player;
        player = await Player.findOne({where: {name}});
        const connectedPlayer = new ConnectedPlayer(wss, socket, token, player);

        state.connectedPlayers.add(socket.id, connectedPlayer);
        wss.publish('player.connect', connectedPlayer.public);
        console.log(`${state.connectedPlayers.all().length} players connected`);

        socket.send('connected', player.json({token, socketId: socket.id}));
        socket.send('players', state.connectedPlayers.all().map(player => player.public));
        socket.send('games', state.games.all());
    } catch (err) {
        console.error(err.message, err.stack);
    }
};
