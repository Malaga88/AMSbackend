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

app.use(cors({
    origin:['http://127.0.0.1:5500', 'https://amsbackend-xx23.onrender.com'],
    credentials: true,
    method: ['GET', 'POST', 'PUT', 'DELETE']
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