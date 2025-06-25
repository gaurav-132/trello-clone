import express from 'express';
import dotenv from 'dotenv';
import connectDb from './src/config/db.js';
import loadAll from './src/config/loader.js';
import cors from 'cors';
import { taskRoutes } from './src/routes/task.routes.js';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));


loadAll(app);


connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App is running on port ${process.env.PORT}`)
    })
})
