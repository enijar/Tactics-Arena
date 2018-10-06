#!/usr/bin/env node
const database = require('../src/server/database/index');
require('../src/server/models/index');

(async () => {
    await database.sync({force: true});
    process.exit();
})();
