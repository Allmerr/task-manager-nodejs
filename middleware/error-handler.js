const { CustomApiError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.status).json({ success: false, message: "Failed, Not Found", data: err.message });
    }
    return res.status(505).json({ success: false, message: "Failed, Something Went Wrong", data: err });
};

module.exports = errorHandler;
