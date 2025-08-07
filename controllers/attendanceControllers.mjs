import User from '../models/userModel.mjs';
import Course from '../models/coursesModel.mjs';
import Attendance from '../models/attendanceModel.mjs';

export const markAttendance = async (req, res) => {
  try {
    const { id } = req.body;
    console.log('Marking attendance for ID:', id);

    if (!id  ) {
      return res.status(400).json({
        success: false,
        message: 'ID is required',
      });
    }

    // 1. Find user by ID
    const user = await User.findOne({ studentId: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.log('Course found:', user.course);
    // 2. Check if user has a course assigned
    if (!user.course) {
      console.log(user.course);
      return res.status(400).json({
        success: false,
        message: 'User has no registered course',
      });
    }

    // 3. Get course info (you can also check specific times if needed)
    // const course = await Course.findOne({ name: user.course });
    // console.log('Course found:', course);
    // if (!course) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Course not found',
    //   });
    // }

    // 4. Get today’s date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 5. Check if user already has attendance today
    const existing = await Attendance.findOne({ id, Date: today });

    if (!existing) {
      // Not marked yet – mark as present
      const attendance = new Attendance({
        id,
        course: user.course,
        status: 'present',
        Date: today,
      });

      await attendance.save();

      return res.status(201).json({
        success: true,
        message: 'Attendance marked as present',
        data: attendance,
      });
    } else if (existing.status === 'present') {
      // Already marked present – now mark as checkout
      existing.status = 'checkout';
      await existing.save();

      return res.status(200).json({
        success: true,
        message: 'Attendance updated to checkout',
        data: existing,
      });
    } else {
      // Already marked with other status (absent or checkout)
      return res.status(200).json({
        success: true,
        message: `Attendance already marked as ${existing.status}`,
        data: existing,
      });
    }

  } catch (error) {
    console.error('Attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing attendance',
      error: error.message,
    });
  }
};
