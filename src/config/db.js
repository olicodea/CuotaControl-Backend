import mongoose from 'mongoose';

const connectDataBase = async () => {
    try {
        const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;
        console.log(URI);
        await mongoose.connect(URI);

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDataBase;