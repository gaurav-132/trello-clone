import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: Number,
            enum: [1, 2, 3], // 1 = To do, 2 = In progress, 3 = Done
            required: true,
        },

        priority: {
            type: Number,
            enum: [1, 2, 3], // 1 = Low, 2 = Medium, 3 = High
            required: true,
        },

        dueDate: {
            type: Date,
            required: false,
        },

        assignedTo: {
            type: String,
            required: true,
            trim: true,
        },
        
        belongsToBoard: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
