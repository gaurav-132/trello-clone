import express from 'express';
import { submitTask, getTasks, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.route('/add-task').post(submitTask);
router.route('/get-tasks').post(getTasks);
router.route('/delete-task/:id').delete(deleteTask);



export {router as taskRoutes};