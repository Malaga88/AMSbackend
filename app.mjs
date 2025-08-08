import dotenv from 'dotenv';
dotenv.config();
import seedAdmin from './controllers/admin.mjs';

seedAdmin();
import express from 'express';
import cors from 'cors';

import attendanceRouter from './routes/attendanceRoute.mjs';
import adminRouter from './routes/admin.mjs';

import connectToDatabase from './lib/mongoDB.mjs';
connectToDatabase()


import { registerStudent } from './controllers/addUsersControllers.mjs';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.105:3000']; // your IP here

app.use(cors({
  origin: ['https://fadil-svg.github.io/Attendance-Management-System'], 
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello World");
});

app.use('/api/admin/', adminRouter);
app.use('/api/User/attendance/', attendanceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});