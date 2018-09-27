import Query from "./Query";

export default async user => {
    const data = [user.name, user.password];

    try {
        await Query("insert into users (name, password, created_at, updated_at) values (?, ?, NOW(), NOW())", data);
        return await Query('select * from users where name = ? and password = ? limit 1', data);
    } catch (err) {
        console.error(`CreateUser query failed: "${err.message}"`);
    }
};
