import mongoose from 'mongoose';
import config from 'config';
const dbUrl: string = config.get('dbUrl');

const connectDb = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to the database');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDb;