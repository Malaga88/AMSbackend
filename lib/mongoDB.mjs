import mongoose from 'mongoose';

const mongo_url  = 'mongodb://localhost:27017/AMS-SERVER';



let cached = global.mongoose;
 if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

async function connectToMongoDB() {
    if (cached.conn) 
        return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongo_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        }).then(m => console.log("Connected to mongoDB"))
        .catch(error => console.log("Error connecting to MongoDB", error))
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToMongoDB;