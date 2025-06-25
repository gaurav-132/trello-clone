import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Board = mongoose.model("Board", BoardSchema);

export default Board;
