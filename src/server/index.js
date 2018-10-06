const {app, server, socket} = require('./bootstrap');
const database = require('./database/index');
const config = require('./config/index');
const Logger = require('./functions/Logger');
const ResetAllTokens = require('./functions/ResetAllTokens');

(async () => {
    ResetAllTokens();

    require('./routes')(app);
    require('./socket/index')(socket);

    await database.sync();

    server.listen(config.server.port, () => {
        Logger.info(`Server running on port ${config.server.port}`);
    });
})();
