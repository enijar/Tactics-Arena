import bcrypt from "bcrypt";
import FindUser from "../Functions/FindUser";
import CreateUser from "../Functions/CreateUser";
import app from "../app/index";
import config from "../../common/config";

const SALT_ROUNDS = 10;

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const validation = app.Validator.validate(req.body, config.validators.registration(req.body));

    // Validate validation passed
    if (!validation.passed) {
        res.status(400);
        res.send(JSON.stringify({success: false, errors: validation.errors}));
        return;
    }

    // Validate name doesn't already exist in DB
    if (await FindUser(req.body.name)) {
        res.status(400);
        res.send(JSON.stringify({success: false, errors: ['Username already taken']}));
        return;
    }

    // Store name and hashed password in DB
    try {
        const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        await CreateUser({name: req.body.name, password});
        res.send(JSON.stringify({success: true}));
    } catch (err) {
        console.error(err);
        res.status(400);
        res.send(JSON.stringify({success: false, errors: ['Error, try again later']}));
    }
}
