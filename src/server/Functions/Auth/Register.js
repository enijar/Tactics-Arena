import bcrypt from "bcrypt";
import FindUser from "../DB/FindUser";
import app from "../../app/index"
import config from "../../../common/config";
import CreateUser from "../DB/CreateUser";

const SALT_ROUNDS = 10;

export default async data => {
    const validation = app.Validator.validate(data, config.validators.register(data));

    // Validate validation passed
    if (!validation.passed) {
        return {
            success: false,
            status: 400,
            errors: validation.getErrors()
        };
    }

    // Validate name doesn't already exist in DB
    if (await FindUser(data.name)) {
        return {
            success: false,
            status: 400,
            errors: ['Username already taken']
        };
    }

    // Store name and hashed password in DB
    try {
        const password = await bcrypt.hash(data.password, SALT_ROUNDS);
        await CreateUser({name: data.name, password});

        return {
            success: true,
            status: 200
        }
    } catch (err) {
        console.error(`Registration error: "${err.message}"`);

        return {
            success: false,
            status: 400,
            errors: ['Error, try again later']
        };
    }
}
