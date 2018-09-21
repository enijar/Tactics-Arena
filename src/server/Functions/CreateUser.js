import Query from "./Query";

export default async user => {
    try {
        await Query("insert into users (name, password, created_at, updated_at) values (?, ?, NOW(), NOW())", [
            user.name,
            user.password
        ]);
    } catch (err) {
        console.error(`CreateUser query failed: "${err.message}"`);
    }
};
