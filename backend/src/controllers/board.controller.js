import Board from "../models/board.model.js";

const submitBoard = async (req, res) => {
    try {
        let message = "";
        const body = req.body;

        if (body?._id) {
            await Board.findByIdAndUpdate(body._id, body);
            message = "Board updated successfully";
        } else {
            await Board.create(body);
            message = "Board inserted successfully";
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



const getBoards = async (req, res) => {
    try {
        const boards = await Board.find();

        res.status(200).json({message : "Boards fetched successfully!", boards}, 200, []);
    } catch (error) {
        res.status(400).json({message: error.message}, 400, [])
    }
}






export {submitBoard, getBoards };