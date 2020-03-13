const httpStatus = require('http-status');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {ExtractJwt} = require('passport-jwt');

const authConfig = require('../config/auth');

const User = require('../models/user');
const SessionExpired = require('../exceptions/session-expired');

exports.jwt = new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: authConfig.jwt.secret
    }, (jwtPayload, next) => {
        if (Date.now() > jwtPayload.expires) {
            return next(new SessionExpired({message: 'Token expired', status: httpStatus.FORBIDDEN}));
        }

        // TODO: check if TOKEN is allowed access to system

        return next(null, jwtPayload);
    }
);

exports.db = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, next) => {
    try {
        const user = await User.findOne({username: username}).exec();
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
            return next(null, user);
        } else {
            return next('invalid login credential!');
        }
    } catch (error) {
        next(error);
    }
});
