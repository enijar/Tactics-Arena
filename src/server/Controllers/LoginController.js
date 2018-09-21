import bcrypt from "bcrypt";
import FindUser from "../Functions/FindUser";
import app from "../app/index"
import config from "../../common/config";

const unauthorized = (req, res) => {
    console.error(`Unauthorized access for "${req.body.name}"`);

    res.status(401);
    res.send(JSON.stringify({success: false, errors: ['Incorrect credentials']}));
};

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const validation = app.Validator.validate(req.body, config.validators.login(req.body));

    // Validate validation passed
    if (!validation.passed) {
        res.status(400);
        res.send(JSON.stringify({success: false, errors: validation.getErrors()}));
        return;
    }

    const user = await FindUser(req.body.name);

    // Validate name exists in DB
    if (!user) {
        unauthorized(req, res);
        return;
    }

    // Attempt to login
    try {
        const authorized = await bcrypt.compare(req.body.password, user.password);

        if (!authorized) {
            unauthorized(req, res);
            return;
        }

        res.send(JSON.stringify({success: true}));
    } catch (err) {
        console.error(`Failed to create hash, with error: "${err.message}"`);
        unauthorized(req, res);
    }
}
