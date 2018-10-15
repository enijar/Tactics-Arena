const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Validator = require('../../common/Validator/index');
const Logger = require('../functions/Logger');
const config = require('../config/index');

const unauthorized = (req, res) => {
    Logger.info(`Incorrect credentials for user "${req.body.name}"`);

    return res.status(401).json({
        success: false,
        status: 401,
        errors: ['Incorrect credentials']
    });
};

module.exports = async (req, res) => {
    const validation = Validator.validate(req.body, config.common.validators.login(req.body));

    // Validate validation passed
    if (!validation.passed) {
        return res.status(401).json({
            success: false,
            status: 400,
            errors: validation.getErrors()
        });
    }

    let user = await User.findOne({where: {name: req.body.name}});

    // Validate name exists in DB
    if (!user) {
        return unauthorized(req, res);
    }

    // Attempt to login
    try {
        const authorized = await bcrypt.compare(req.body.password, user.password);

        if (!authorized) {
            return unauthorized(req, res);
        }

        const token = jwt.sign({user: user.json()}, config.server.key);
        user.saveToken(token);
        user = user.json();
        user.jwt = token;

        return res.status(200).json({
            success: true,
            status: 200,
            data: user,
        });
    } catch (err) {
        Logger.error(err);
        return unauthorized(req, res);
    }
};
