const AppController = require('./controllers/AppController');
const GameListController = require('./controllers/GameListController');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');

module.exports = app => {
    app.get('/api/game-list', GameListController);
    app.post('/api/login', LoginController);
    app.post('/api/register', RegisterController);
    app.get('*', AppController);
};
