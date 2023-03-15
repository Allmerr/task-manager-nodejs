class CustomApiError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.status = statusCode;
    }
}

const createApiError = (msg, statusCode) => {
    return new CustomApiError(msg, statusCode);
};

module.exports = { createApiError, CustomApiError };
