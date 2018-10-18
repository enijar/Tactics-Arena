module.exports = class Game {
    constructor(id, floor, arena, players = [], spectators = []) {
        this.id = id;
        this.floor = floor;
        this.arena = arena;
        this.players = players;
        this.spectators = spectators;
    }
};
