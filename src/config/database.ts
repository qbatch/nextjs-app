import mongoose from 'mongoose';

export const DataBaseConnection = async () => {
  try {
    const { MONGO_URL } = process.env;
    await mongoose.connect(MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      // process.exit();
    });
  } catch (error) {
    console.log('Something goes wrong!', error);
  }
};
