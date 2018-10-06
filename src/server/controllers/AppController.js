const path = require('path');
const config = require('../config/index');

module.exports = (req, res) => {
    res.sendFile(path.join(config.paths.public, 'index.html'));
};
