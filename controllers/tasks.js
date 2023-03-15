const asyncWrapper = require("../middleware/async");
const TaskModel = require("../model/task");
const { createApiError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await TaskModel.find({});
    res.status(200).json({ success: true, message: "Get All Tasks", data: task });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await TaskModel.insertMany(req.body);
    res.status(201).json({ success: true, message: "Create A Task", data: task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const task = await TaskModel.findOne({ _id: req.params.id });
    if (!task) {
        return next(createApiError("Not Found", 404));
    }
    res.status(200).json({ success: true, message: "Get A Task", data: task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const task = await TaskModel.findOne({ _id: req.params.id });
    if (!task) {
        return next(createApiError("Not Found", 404));
    } else {
        const updateResult = await TaskModel.updateOne(
            {
                _id: req.params.id,
            },
            {
                $set: {
                    name: req.body.name,
                    completed: req.body.completed,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({ success: true, message: "Update A Task", data: updateResult });
    }
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const task = await TaskModel.findOne({ _id: req.params.id });
    if (!task) {
        return next(createApiError("Not Found", 404));
    }
    const deleteResult = await TaskModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ success: true, message: "Delete A Task", data: deleteResult });
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
