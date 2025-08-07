import User from '../models/userModel.mjs';

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(`Fetching user with ID: ${userId}`);
        const user = await User.findOne({ id: userId }).select('-__v');
        console.log(user);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching user', 
            error: error.message 
        });
    }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};