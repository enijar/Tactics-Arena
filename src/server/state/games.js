module.exports = {
    games: {},
    all() {
        const games = [];
        for (let id in this.games) {
            if (!this.games.hasOwnProperty(id)) {
                continue;
            }
            games.push(this.games[id]);
        }
        return games;
    },
    find(id, defaultValue = null) {
        if (!this.games.hasOwnProperty(id)) {
            return defaultValue;
        }
        return this.games[id];
    },
    addPlayer(player) {
        for (let id in this.games) {
            if (!this.games.hasOwnProperty(id)) {
                continue;
            }

            if (!this.games[id].players.find(p => p.id === player.id)) {
                this.games[id].addPlayer(player);
                break;
            }
        }
    },
    removePlayer(player) {
        for (let id in this.games) {
            if (!this.games.hasOwnProperty(id)) {
                continue;
            }

            if (this.games[id].players.find(p => p.id === player.id)) {
                this.games[id].removePlayer(player);
                break;
            }
        }
    },
    add(id, game) {
        this.games[id] = game;
    },
    remove(id) {
        if (this.games.hasOwnProperty(id)) {
            delete this.games[id];
        }
    }
};
