const passport = require('passport');
const httpStatus = require('http-status');

const PermissionDeniedError = require('../../exceptions/permission-denied');

const handleJWT = (req, res, next) => async (err, user, info) => {
    const error = err || info;
    const logIn = Promise.promisify(req.logIn);
    try {
        if (error || !user) throw error;
        await logIn(user, {session: false});
        req.user = user;
        return next();
    } catch (e) {
        return next(new PermissionDeniedError({
            message: error ? error.message : "Unauthorized",
            status: httpStatus.UNAUTHORIZED,
            stack: error ? error.stack : undefined
        }));
    }
};

module.exports = (roles = User.roles) => (req, res, next) => {
    passport.authenticate(
        "jwt",
        {session: false},
        handleJWT(req, res, next, roles)
    )(req, res, next);
};
