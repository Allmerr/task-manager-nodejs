const mongoose = require("mongoose");

const TaskModel = mongoose.model("Task", {
    name: {
        type: String,
        required: [true, "Must provide a name"],
        trim: true,
        maxlength: [30, "Name must be under 30 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = TaskModel;
