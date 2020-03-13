const BaseError = require('./base-error');

class SessionExpired extends BaseError {
    constructor({
                    message,
                    errors,
                    stack,
                    status,
                    isPublic = false,
                }) {
        super({
            message, errors, status, isPublic, stack,
        });
    }
}

module.exports = SessionExpired;
