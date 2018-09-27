import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FindUser from "../DB/FindUser";
import app from "../../index";
import env from "../../../../../env";
import config from "../../../../common/config";
import RemoveHiddenFields from "../DB/RemoveHiddenFields";
import SaveUserToken from "./SaveUserToken";

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

    let user = await FindUser(data.name);

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

        user = RemoveHiddenFields(user, ['password']);

        user.jwt = jwt.sign({user}, env.jwt.secret);
        SaveUserToken(user);

        return {
            success: true,
            status: 200,
            data: user
        };
    } catch (err) {
        console.error(`Failed to create hash, with error: "${err.message}"`);
        return unauthorized(data);
    }
}
