module.exports = {
    '^ping$': require('./PingCommand'),
    '^stats?': require('./StatCommand'),
    '^challenge?': require('./ChallengeCommand'),
};
