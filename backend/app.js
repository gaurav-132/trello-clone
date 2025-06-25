import express from 'express';
import dotenv from 'dotenv';
import connectDb from './src/config/db.js';
import loadAll from './src/config/loader.js';
import cors from 'cors';
import { taskRoutes } from './src/routes/task.routes.js';
dotenv.config()

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());




app.use(express.urlencoded({ extended: true, limit: "1000mb" }));


loadAll(app);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App is running on port ${process.env.PORT}`)
    })
})
