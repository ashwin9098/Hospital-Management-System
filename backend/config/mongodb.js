import mongoose from "mongoose";

const connectDB = async () => {
    // Force local MongoDB connection (ignore .env MONGODB_URI for now)
    const mongoUri = 'mongodb://127.0.0.1:27017/prescripto';
    
    mongoose.connection.on('connected', () => console.log("Database Connected"))
    mongoose.connection.on('error', (err) => console.log("Database Error: ", err))
    mongoose.connection.on('disconnected', () => console.log("Database Disconnected"))
    
    await mongoose.connect(mongoUri)

}

export default connectDB
