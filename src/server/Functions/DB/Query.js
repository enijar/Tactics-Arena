import mysql from "mysql";
import db from "../../db/index";

export default (sql, data = []) => new Promise((resolve, reject) => {
    sql = mysql.format(sql, data);

    db.query(sql, (err, results) => {
        if (err) {
            reject(err);
            return;
        }

        let result = false;

        if (results.length === 1) {
            result = results[0];
        }

        if (results.length > 1) {
            result = results;
        }

        resolve(result);
    });
});
