import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`DB Connected to: ${connection.connection.host} on port: ${connection.connection.port}`);
    } catch (error) {
        console.log('Error trying to connect DB: ', error);
        process.exit(1);
    }
}

export default connectDB;