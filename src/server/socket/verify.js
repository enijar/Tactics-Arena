const Logger = require('../functions/Logger');
const VerifyUser = require('../functions/VerifyUser');

module.exports = (io, socket) => {
    socket.use((event, next) => {
        const data = event[1];

        if (!data.hasOwnProperty('user')) {
            Logger.info('No user sent with socket event');
            return;
        }

        if (!VerifyUser(data.user)) {
            socket.disconnect();
            Logger.info(`Unverified user "${data.user.name}"`);
            return;
        }

        next();
    });
};
