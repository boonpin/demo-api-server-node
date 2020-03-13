const httpStatus = require('http-status');

class BaseError extends Error {
    constructor({message, errors, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic, stack}) {
        super();

        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.stack = stack;

        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        this.errors = errors;
    }
}

module.exports = BaseError;
