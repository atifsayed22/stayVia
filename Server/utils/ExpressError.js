class ExpressError extends Error {
    constructor(status, message) {
        super(message);       // call the parent Error constructor with message
        this.status = status; // assign the status code
    }
}

module.exports = ExpressError;
