import bcrypt from "bcrypt";
import FindUser from "../Functions/FindUser";
import CreateUser from "../Functions/CreateUser";

const SALT_ROUNDS = 10;

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Validate data exists
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('password') ||!req.body.hasOwnProperty('passwordConfirm')) {
        res.status(400);
        res.send(JSON.stringify({success: false, errors: ['Enter a name, password and confirm']}));
        return;
    }

    // Validate passwords match
    if (req.body.password !== req.body.passwordConfirm) {
        res.status(400);
        res.send(JSON.stringify({success: false, errors: ["Passwords don't match"]}));
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
