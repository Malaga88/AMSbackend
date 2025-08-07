import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.mjs';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        const adminId = req.user?.id;

        if (!adminId) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const admin = await Admin.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
