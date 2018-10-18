const bcrypt = require('bcrypt');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const Validator = require('../../common/Validator/index');
const Player = require('../models/Player');
const config = require('../config');
const cache = require('../services/cache');

const unauthorized = async (req, res) => {
    console.info(`Incorrect credentials for player "${req.body.name}"`);

    // Log failed attempt for this user with the request IP
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const loginAttemptsKey = `login:attempts:${md5(`${req.body.name}${ip}`)}`;
    const loginAttempts = await cache.get(loginAttemptsKey, 0);
    await cache.set(loginAttemptsKey, loginAttempts + 1, 1000 * 3600);

    return res.status(401).json({
        success: false,
        errors: ['Unauthorized'],
    });
};

/**
 * Authentication flow:
 * 1. Validate req.body
 * 2. Throttle failed login attempts
 * 3. Check player name exists in DB
 * 4. Check player name and hashed password match DB versions
 * 5. Return errors or authenticated user with JWT if successful
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<*>}
 */
module.exports = async (req, res) => {
    const validation = Validator.validate(req.body, config.common.validators.login(req.body));

    // Validate validation passed
    if (!validation.passed) {
        return res.status(401).json({
            success: false,
            errors: validation.getErrors(),
        });
    }

    // Validate login attempts has not been exceeded
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const loginAttemptsKey = `login:attempts:${md5(`${req.body.name}${ip}`)}`;
    const loginAttempts = await cache.get(loginAttemptsKey, 0);

    if (loginAttempts >= config.loginAttemptsThrottle) {
        // Prevent more login attempts.
        return res.status(429).json({
            success: false,
            errors: ['Too many login attempts, try again later'],
        });
    }

    const player = await Player.findOne({where: {name: req.body.name}});

    // Validate name exists in DB
    if (!player) {
        return await unauthorized(req, res);
    }

    // Attempt to login
    try {
        if (!await bcrypt.compare(req.body.password, player.password)) {
            return await unauthorized(req, res);
        }

        // We not longer need to keep track of the failed login attempts, since we're not logged in.
        await cache.remove(loginAttemptsKey);

        const token = jwt.sign({player: player.json()}, config.key);
        const playerJSON = player.json({token});

        // Save playerJSON to the cache with a key of player.id
        await cache.set(`player.${player.id}`, JSON.stringify(playerJSON), config.tokenExpireTime);

        res.status(200).json({success: true, data: playerJSON});
    } catch (err) {
        console.error(err.message);
        return await unauthorized(req, res);
    }
};
