const AppController = require('./controllers/AppController');
const GameListController = require('./controllers/GameListController');
const PlayerListController = require('./controllers/PlayerListController');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');

module.exports = app => {
    app.get('/api/game-list', GameListController);
    app.get('/api/player-list', PlayerListController);
    app.post('/api/login', LoginController);
    app.post('/api/register', RegisterController);
    app.get('*', AppController);
};
