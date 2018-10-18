const AppController = require('./controllers/AppController');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');

module.exports = app => {
    app.post('/api/login', LoginController);
    app.post('/api/register', RegisterController);
    app.get('*', AppController);
};
