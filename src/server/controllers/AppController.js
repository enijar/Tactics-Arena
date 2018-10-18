const path = require('path');
const config = require('../config');

module.exports = (req, res) => {
    res.sendFile(path.join(config.path.public, 'index.html'));
};
