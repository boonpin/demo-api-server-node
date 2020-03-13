const passport = require('passport');
const httpStatus = require('http-status');

const PermissionDeniedError = require('../../exceptions/permission-denied');

const handleJwt = (req, res, next) => async (err, user, info) => {
    const error = err || info;
    try {
        if (error || !user) {
            throw error
        }
        req.user = user;
        return next();
    } catch (e) {
        console.log(e);

        return next(new PermissionDeniedError({
            message: error ? error.message : "Unauthorized",
            status: httpStatus.UNAUTHORIZED,
            stack: error ? error.stack : undefined
        }));
    }
};

module.exports = (req, res, next) => {
    passport.authenticate("jwt", {session: false}, handleJwt(res, res, next))(req, res, next);
};
