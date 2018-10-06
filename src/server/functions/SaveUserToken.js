const fs = require('fs');
const path = require('path');
const config = require('../config/index');

/**
 * When a JWT is created we need to keep track of it. This means we
 * can invalidate a JWT, by simply deleting the token from the
 * store, since all tokens are verified from the store.
 *
 * @param {Object} user
 */
module.exports = user => {
    // Create tokensFile file if it doesn't already exist
    const tokensFile = path.join(config.paths.storage, 'tokens.json');
    if (!fs.existsSync(tokensFile)) {
        fs.writeFileSync(tokensFile, JSON.stringify({}), 'utf-8');
    }

    // Save given user.id and token to tokensFile file
    const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8')) || {};
    tokens[user.id] = {
        name: user.name,
        jwt: user.jwt
    };
    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));
};
