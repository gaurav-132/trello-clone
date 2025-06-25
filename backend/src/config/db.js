import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('database connected successfully!')
    } catch (error) {
        console.log(error.message);
        process.exit(0);
    }
}

export default connectDb;