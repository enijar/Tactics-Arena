module.exports = io => {
    require('./connection')(io);
    require('./chat')(io);
};
