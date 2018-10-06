const fs = require('fs');
const path = require('path');
const config = require('../config/index');

module.exports = () => {
    const tokensFile = path.join(config.paths.storage, 'tokens.json');

    if (fs.existsSync(tokensFile)) {
        fs.unlinkSync(tokensFile);
    }
};
