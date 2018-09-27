import bcrypt from "bcrypt";
import FindUser from "../DB/FindUser";
import app from "../../index"
import config from "../../../../common/config";
import CreateUser from "../DB/CreateUser";
import SaveUserToken from "./SaveUserToken";
import RemoveHiddenFields from "../DB/RemoveHiddenFields";
import jwt from "jsonwebtoken";
import env from "../../../../../env";

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
        let user = await CreateUser({name: data.name, password});
        user = RemoveHiddenFields(user, ['password']);
        user.jwt = jwt.sign({user}, env.jwt.secret);
        SaveUserToken(user);

        return {
            success: true,
            status: 200,
            user
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
