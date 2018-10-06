const path = require('path');
const base = path.resolve(__dirname, '..', '..', '..');

module.exports = {
    base,
    public: path.join(base, 'public'),
    storage: path.join(base, 'storage'),
};
