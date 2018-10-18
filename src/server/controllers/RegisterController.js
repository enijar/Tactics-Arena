const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Player = require('../models/Player');
const Validator = require('../../common/Validator/index');
const config = require('../config');
const cache = require('../services/cache');

module.exports = async (req, res) => {
    const validation = Validator.validate(req.body, config.common.validators.register(req.body));

    // Validate validation passed
    if (!validation.passed) {
        return res.status(400).json({
            success: false,
            errors: validation.getErrors(),
        });
    }

    // Validate name doesn't already exist in DB
    if (await Player.findOne({where: {name: req.body.name}})) {
        return res.status(409).json({
            success: false,
            errors: ['Name already taken'],
        });
    }

    // Store name and hashed password in DB
    try {
        const password = await bcrypt.hash(req.body.password, config.saltRounds);
        const player = await Player.create({name: req.body.name, password});
        const token = jwt.sign({player: player.json()}, config.key);
        const playerJSON = player.json({token});

        // Save playerJSON to the cache with a key of player.id
        await cache.set(`player.${player.id}`, JSON.stringify(playerJSON), config.tokenExpireTime);

        res.status(200).json({success: true, data: playerJSON});
    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            success: false,
            errors: ['Server error, try again later'],
        });
    }
};
