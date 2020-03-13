module.exports = function (err, req, res, next) {
    const isDevMode = req.app.get('env') === 'development';

    if (isDevMode) {
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
        if (isDevMode) {
            d.error = err;
        }
        res.send(d);
    } else {
        res.locals.message = err.message;
        res.locals.error = isDevMode ? err : {};
        res.status(err.status || 500);
        res.render('error');
    }
};
