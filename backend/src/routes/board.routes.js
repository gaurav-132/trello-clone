import express from 'express';
import { submitBoard, getBoards } from '../controllers/board.controller.js';

const router = express.Router();

router.route('/add-board').post(submitBoard);
router.route('/get-boards').get(getBoards);



export {router as boardRoutes};