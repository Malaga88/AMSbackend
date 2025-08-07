import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['present', 'absent', 'checkout'],
        default: 'present'
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
   
},
 {
    timestamps: true 
    });

AttendanceSchema.index({id: 1, Date: 1}, { unique: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;  