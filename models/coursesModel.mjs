import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: String, required: true },
    instructor: { type: String, required: true },
    day: { type: String, required: true }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
