require('./bootstrap');

const httpError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');

const appConfig = require('./app/config/app');

const db = require('./app/provider/database');
db.rdbm.authenticate().then(() => {
    console.log('rdbm database connection has been established successfully.');
}).catch(err => {
    console.error(`unable to connect to the rdbm database: ${err}`);
});

if (db.mongo) {
    db.mongo.connect(() => {
        console.log('mongo database connection established successfully');
    }, (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });
}

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
// app.use(cors);

app.use(passport.initialize());
passport.use("jwt", require('./app/provider/auth').jwt);
//passport.use("db", require('./app/provider/auth').db);

// routes
app.use('/', require('./routes/index'));

app.use('/api/general', require('./routes/api/general'));
app.use('/api/auth', require('./routes/api/auth'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(httpError({message: 'resource not found', status: 404}));
});

// error handler
app.use(require('./app/exceptions/handler'));


if (appConfig.debug) {
    console.warn('WARNING: APP STARTED IN DEBUG MODE');
}

module.exports = app;
