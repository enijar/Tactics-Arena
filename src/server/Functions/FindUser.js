import fs from "fs";
import path from "path";

export default name => {
    const usersFile = path.resolve(__dirname, '..', 'data', 'users.json');

    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([]), 'utf-8');
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

    return users.find(user => user.name === name) || false;
};
