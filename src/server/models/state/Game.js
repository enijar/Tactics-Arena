module.exports = class Game {
    constructor(id, floor, arena, players = [], spectators = []) {
        this.id = id;
        this.floor = floor;
        this.arena = arena;
        this.players = players;
        this.spectators = spectators;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p.id !== player.id);
    }
};
