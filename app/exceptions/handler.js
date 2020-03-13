const appConfig = require('../config/app');

module.exports = function (err, req, res, next) {
    if (appConfig.debug) {
        console.error(err);
    } else {
        console.error('Error: ' + err.message);
    }
    const reqContentType = req.headers["Content-Type"];
    const isApi = req.originalUrl.startsWith('/api') || (reqContentType ? reqContentType.endsWith('/json') : false);
    if (isApi) {
        const d = {
            message: err.message,
            status: err.status || 500
        };
        if (appConfig.debug) {
            d.error = err;
        }
        res.send(d);
    } else {
        res.locals.message = err.message;
        res.locals.error = appConfig.debug ? err : {};
        res.status(err.status || 500);
        res.render('error');
    }
};
