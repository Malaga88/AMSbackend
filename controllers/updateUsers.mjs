import User from '../models/userModel.mjs';

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, role, Course } = req.body;

 
        const user = await User.findOne({ id: userId });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }


        const updateData = {};
        if (name) updateData.name = name.trim();
        if (email) updateData.email = email.trim().toLowerCase();
        if (role) updateData.role = role.trim();
        if (Course !== undefined) updateData.Course = Course ? Course.trim() : Course;

        
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ 
                email: email.trim().toLowerCase(),
                id: { $ne: userId } 
            });
            
            if (emailExists) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'Email already exists' 
                });
            }
        }

        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({ 
                success: false, 
                message: `User with this ${field} already exists` 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Error updating user', 
            error: error.message 
        });
    }
};
