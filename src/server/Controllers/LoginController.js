import bcrypt from "bcrypt";
import FindUser from "../Functions/FindUser";

const unauthorized = (req, res) => {
    console.error(`Unauthorized access for "${req.body.name}"`);

    res.status(401);
    res.send(JSON.stringify({success: false, errors: ['Incorrect login, try again']}));
};

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Validate data exists
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('password')) {
        res.status(400);
        res.send(JSON.stringify({success: false, errors: ['Enter a name and password']}));
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
