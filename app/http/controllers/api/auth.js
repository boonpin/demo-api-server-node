const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const auth = require('../../../config/auth');
const user = require('../../../models/user');
const PermissionDeniedError = require('../../../exceptions/permission-denied');


exports.doLogin = async (req, res, next) => {
    const rs = await user.findOne({
        where: {username: req.body.username}
    });

    if (rs && await bcrypt.compare(req.body.password, rs.password)) {
        const secret = auth.jwt.secret;
        const token = jwt.sign({
            username: rs.username,
            name: rs.name,
            email: rs.email,
            contact: rs.contact
        }, secret, {
            expiresIn: auth.jwt.expiry
        });

        rs.refresh_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        rs.refresh_token_expiry = (new Date()).getTime() + auth.jwt.refresh_token_expiry;
        rs.save();

        return res.status(200).json({
            message: "success",
            token,
            refreshToken: rs.refresh_token
        });
    }

    next(new PermissionDeniedError({message: 'invalid login credential', status: httpStatus.UNAUTHORIZED}));
};

exports.refreshToken = async (req, res, next) => {

};

exports.logout = async (req, res, next) => {

};

exports.getUser = async (req, res, next) => {

};
