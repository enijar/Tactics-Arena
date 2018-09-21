import mysql from 'mysql';
import env from '../../../env';

export default mysql.createPool({
    connectionLimit: 10,
    host: env.db.host,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database
});
