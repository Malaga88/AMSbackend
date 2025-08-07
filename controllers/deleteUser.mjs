import User from '../models/userModel.mjs';

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        
        if (req.user?.id === userId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cannot delete your own account' 
            });
        }

        const deletedUser = await User.findOneAndDelete({ id: userId });

        if (!deletedUser) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: { deletedUserId: userId }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting user', 
            error: error.message 
        });
    }
};




export const bulkDeleteUsers = async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'userIds array is required' 
            });
        }

        if (userIds.includes(req.user?.id)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cannot delete your own account' 
            });
        }

        const result = await User.deleteMany({ 
            id: { $in: userIds } 
        });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} users deleted successfully`,
            data: { deletedCount: result.deletedCount }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting users', 
            error: error.message 
        });
    }
};