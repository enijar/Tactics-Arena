const fs = require('fs');
const path = require('path');
const config = require('../config/index');

module.exports = user => {
    const tokensFile = path.join(config.paths.storage, 'tokens.json');
    let tokens = {};

    if (fs.existsSync(tokensFile)) {
        tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8') || '{}') || {};
    }

    if (tokens.hasOwnProperty(user.id)) {
        tokens[user.id].socketId = user.socketId;
    }

    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2), 'utf-8');
};
