import { Router } from "express";
import { getUserById } from '../controllers/getUsers.mjs';
import { registerStudent } from '../controllers/addUsersControllers.mjs';
import { updateUser } from "../controllers/updateUsers.mjs";
import {requireAdmin} from '../middleware/authMiddleware.mjs';
import { bulkDeleteUsers } from "../controllers/deleteUser.mjs";
import { loginAdmin } from '../controllers/adminLogin.mjs';
import { createCourse, getCourses, getCourseById, deleteCourse} from "../controllers/coursesController.mjs";
import { getAttendance } from "../controllers/attendance.mjs";
import { getUsers } from "../controllers/getUsers.mjs";
import { deleteUser } from "../controllers/deleteUser.mjs";

const adminRouter = Router();
adminRouter.post('/login', loginAdmin);
adminRouter.post('/register',  registerStudent);
adminRouter.get('/get-users/:userId', getUserById);
adminRouter.put('/update-users/:userId', requireAdmin, updateUser);
adminRouter.delete('/bulk-delete', bulkDeleteUsers);
adminRouter.post('/create-course', createCourse);
adminRouter.delete('/delete', deleteUser)
adminRouter.get('/get-courses', getCourses);
adminRouter.get('/get-course/:id', getCourseById);
adminRouter.get('/attendance', getAttendance);
adminRouter.delete('/delete-course/:id', deleteCourse);
adminRouter.get('/get-users', getUsers)

export default adminRouter;