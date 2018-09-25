import bcrypt from "bcrypt";
import FindUser from "../DB/FindUser";
import app from "../../index"
import config from "../../../../common/config";

const unauthorized = data => {
    console.error(`Unauthorized access for "${data.name}"`);

    return {
        success: false,
        status: 401,
        errors: ['Incorrect credentials']
    };
};

export default async data => {
    const validation = app.Validator.validate(data, config.validators.login(data));

    // Validate validation passed
    if (!validation.passed) {
        return {
            success: false,
            status: 400,
            errors: validation.getErrors()
        };
    }

    const user = await FindUser(data.name);

    // Validate name exists in DB
    if (!user) {
        return unauthorized(data);
    }

    // Attempt to login
    try {
        const authorized = await bcrypt.compare(data.password, user.password);

        if (!authorized) {
            return unauthorized(data);
        }

        return {
            success: true,
            status: 200
        };
    } catch (err) {
        console.error(`Failed to create hash, with error: "${err.message}"`);
        return unauthorized(data);
    }
}
