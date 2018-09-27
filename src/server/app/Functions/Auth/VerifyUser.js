import fs from "fs";
import path from "path";
import config from "../../../config/index";

/**
 * Here we check the given user.id and user.jwt exist in the
 * user tokens we have on record.
 *
 * @param {Object} user
 * @returns {Boolean}
 */
export default (user = {}) => {
    // No users have logged in before if the tokensFile doesn't
    // exist, meaning this user is invalid.
    const tokensFile = path.join(config.paths.storage, 'tokens.json');
    if (!fs.existsSync(tokensFile)) {
        return false;
    }

    // Verify that user.id, user.name and user.name all exist in
    // the tokensFile and are exactly equal.
    const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8')) || {};
    return (
        tokens.hasOwnProperty(user.id) &&
        user.name === tokens[user.id].name &&
        user.jwt === tokens[user.id].jwt
    );
}
