import AppController from "../app/Controllers/AppController";
import GameListController from "../app/Controllers/GameListController";
import PlayerListController from "../app/Controllers/PlayerListController";
import LoginController from "../app/Controllers/LoginController";
import RegisterController from "../app/Controllers/RegisterController";

export default app => {
    app.get('/api/game-list', GameListController);
    app.get('/api/player-list', PlayerListController);
    app.post('/api/login', LoginController);
    app.post('/api/register', RegisterController);
    app.get('*', AppController);
}
