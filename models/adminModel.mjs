import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please enter a valid email address'
        }
    },
    adminId: {
        type: String,
        required: [true, 'Admin ID is required'],
        unique: true,
        trim: true,
        uppercase: true,
        default: 'ADMIN001'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        required: true,
        default: 'admin',
        immutable: true 
    },
}, {
    timestamps: true,
    toJSON: { 
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

// Prevent creating more than one admin
AdminSchema.pre('save', async function (next) {
    const Admin = mongoose.model('Admin');
    const count = await Admin.countDocuments();
    if (count > 0 && this.isNew) {
        const err = new Error('Only one admin is allowed.');
        return next(err);
    }
    next();
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
