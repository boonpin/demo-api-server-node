exports.rdbm = {
    driver: process.env.DB_DRIVER ? process.env.DB_DRIVER : 'sqlite',
    database: process.env.DB_DATABASE ? process.env.DB_DATABASE : __dirname + '/../../storage/data/database.sqlite',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5
};
