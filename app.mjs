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


// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://fadil-svg.github.io'
];

// Set up CORS with credentials
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
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