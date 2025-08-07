import Attendance from "../models/attendanceModel.mjs";

export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


