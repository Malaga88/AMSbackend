import User from '../models/userModel.mjs';


export const registerStudent = async (req, res) => {
    const { name, email, studentId, role, course } = req.body;
    console.log("Registering user with data:", { name, email, studentId, role, course });

    if (!name || !email || !studentId || !role || !course) {
        console.error("Missing required fields:", { name, email, studentId, role, course });
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!studentId) {
        console.error("Student ID is required.");
        return res.status(400).json({ message: 'Student ID is required.' });
    }

    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, studentId, role, course });
        await user.save();

        console.log("User registered successfully:", user);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                studentId: user.studentId,
                role: user.role,
                course: user.course
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


