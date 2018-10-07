const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Validator = require('../../common/Validator/index');
const SaveUserToken = require('../functions/SaveUserToken');
const Logger = require('../functions/Logger');
const config = require('../config/index');

module.exports = async (req, res) => {
    const validation = Validator.validate(req.body, config.common.validators.login(req.body));

    // Validate validation passed
    if (!validation.passed) {
        return res.status(400).json({
            success: false,
            status: 400,
            errors: validation.getErrors()
        });
    }

    // Validate name doesn't already exist in DB
    if (await User.findOne({where: {name: req.body.name}})) {
        return res.status(409).json({
            success: false,
            status: 409,
            errors: ['Username already taken']
        });
    }

    // Store name and hashed password in DB
    try {
        const password = await bcrypt.hash(req.body.password, config.hashing.saltRounds);
        let user = await User.create({name: req.body.name, password});
        user = user.json();
        user.jwt = jwt.sign({user}, config.server.key);
        SaveUserToken(user);

        return res.status(200).json({
            success: true,
            status: 200,
            data: user
        });
    } catch (err) {
        Logger.error(err);

        return res.status(400).json({
            success: false,
            status: 400,
            errors: ['Error, try again later']
        });
    }
};
