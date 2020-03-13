const Sequelize = require('sequelize');

const db = require('../config/database');

let rdbm;
if (db.rdbm.driver === 'sqlite') {
    rdbm = new Sequelize({
        dialect: 'sqlite',
        storage: db.rdbm.database,
        logging: false
    });
} else {
    rdbm = new Sequelize(db.rdbm.database, db.rdbm.user, db.rdbm.password, {
        host: db.rdbm.host,
        dialect: 'mariadb',
        timezone: 'Asia/Kuala_Lumpur',
        pool: {
            max: db.rdbm.connectionLimit,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    });
}
exports.rdbm = rdbm;
