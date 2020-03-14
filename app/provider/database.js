const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const appConfig = require('../config/app');
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

if (db.mongo && db.mongo.is_enable) {
    mongoose.Promise = Promise;
    mongoose.set('debug', appConfig.debug);
    exports.mongo = {
        mongoose,
        connect(success, error) {
            mongoose.connection.on('connecting', () => {
                console.log(`connection ${db.mongo.uri}`);
            });
            mongoose.connection.on('error', error);
            mongoose.connection.on('connected', success);

            mongoose.connect(db.mongo.uri, {
                keepAlive: 1,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            return mongoose.connection;
        }
    };
} else {
    exports.mongo = null;
}
