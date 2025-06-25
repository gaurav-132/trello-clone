import Task from "../models/task.model.js";

const submitTask = async (req, res) => {
    try {
        let message = "";
        const body = req.body;

        if (body?._id) {
            await Task.findByIdAndUpdate(body._id, body);
            message = "Task updated successfully";
        } else {
            await Task.create(body);
            message = "Task inserted successfully";
        }

        return res.status(201).json({ message, success: true });
    } catch (error) {

        let firstError = error.message;

        if (error.errors && typeof error.errors === 'object') {
        const errorsArray = Object.values(error.errors);
        if (errorsArray.length > 0 && errorsArray[0].message) {
            firstError = errorsArray[0].message;
        }
        }

        return res.status(400).json({ message: firstError });
    }
};



const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ belongsToBoard: req.body.type });

        res.status(200).json({message : "Tasks fetched successfully!", tasks}, 200, []);
    } catch (error) {
        res.status(400).json({message: error.message}, 400, [])
    }
}



const deleteTask = async (req, res) => {
    try {
    
        const taskId = req?.params?.id;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required.", success: false });
        }

        const deleteTask = await Task.findByIdAndDelete(taskId);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found.", success: false });
        }

        return res.status(200).json({ message: "Task deleted successfully!", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};


export {submitTask, getTasks, deleteTask };