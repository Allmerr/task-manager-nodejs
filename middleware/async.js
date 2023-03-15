const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

/*
async (req, res) => {
    const task = await TaskModel.find({});
    res.status(200).json({ success: true, message: "Get All Tasks", data: task });
}
*/

module.exports = asyncWrapper;
