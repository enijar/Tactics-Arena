import AppController from "../Controllers/AppController";
import GameListController from "../Controllers/GameListController";
import PlayerListController from "../Controllers/PlayerListController";
import LoginController from "../Controllers/LoginController";
import RegisterController from "../Controllers/RegisterController";

export default app => {
    app.get('/api/game-list', GameListController);
    app.get('/api/player-list', PlayerListController);
    app.post('/api/login', LoginController);
    app.post('/api/register', RegisterController);
    app.get('*', AppController);
}
