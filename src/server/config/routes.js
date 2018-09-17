import AppController from "../Controllers/AppController";
import GameListController from "../Controllers/GameListController";
import PlayerListController from "../Controllers/PlayerListController";

export default app => {
    app.get('/api/game-list', GameListController);
    app.get('/api/player-list', PlayerListController);
    app.get('*', AppController);
}
