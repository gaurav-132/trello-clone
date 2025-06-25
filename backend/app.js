import express from 'express';
import dotenv from 'dotenv';
import connectDb from './src/config/db.js';
import loadAll from './src/config/loader.js';
import cors from 'cors';
import { taskRoutes } from './src/routes/task.routes.js';
dotenv.config()

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://trello-clone-aoa9-ms9iogjz0-gaurav-132s-projects.vercel.app',
  'https://trello-clone-9vs3.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options('*', cors());


app.use(express.urlencoded({ extended: true, limit: "1000mb" }));


loadAll(app);


connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App is running on port ${process.env.PORT}`)
    })
})
