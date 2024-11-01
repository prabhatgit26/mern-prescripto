import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected Succesfully."));
    
    await mongoose.connect(`${process.env.MONGODB_URI}/Prescripto`)
}

export default connectDB;