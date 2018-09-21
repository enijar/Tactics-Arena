import Query from "./Query";

export default async name => {
    let user = null;

    try {
        user = await Query("select * from users where name = ? limit 1", [name]);
    } catch (err) {
        console.error(`FindUser query failed: "${err.message}"`);
    }

    return user;
};
