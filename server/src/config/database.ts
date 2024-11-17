import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://classic:password@db:27017/quotes?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1);
    }
};
