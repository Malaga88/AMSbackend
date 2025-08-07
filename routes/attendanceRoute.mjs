import { Router } from "express";
import { markAttendance } from '../controllers/attendanceControllers.mjs';

const attendanceRouter = Router();
attendanceRouter.post('/mark', markAttendance);

export default attendanceRouter;