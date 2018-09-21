module.exports = {
    up: `
        create table users (
          id int(10) unsigned NOT NULL AUTO_INCREMENT UNIQUE KEY,
          name varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
          password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
          created_at timestamp NULL DEFAULT NULL,
          updated_at timestamp NULL DEFAULT NULL
        )
    `,
    down: 'drop table users'
};
