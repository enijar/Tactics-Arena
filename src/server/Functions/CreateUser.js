import fs from "fs";
import path from "path";

export default user => {
    const usersFile = path.resolve(__dirname, '..', 'data', 'users.json');

    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([]), 'utf-8');
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    users.push(user);

    fs.writeFileSync(usersFile, JSON.stringify(users), 'utf-8');
};
