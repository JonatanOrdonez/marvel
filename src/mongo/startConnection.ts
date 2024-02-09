import mongoose from 'mongoose';
import {
  MONGO_DB_HOST,
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_PORT,
  MONGO_DB_USERNAME,
} from '../config/env';

export const startConnection = async (): Promise<void> => {
  const connectURI = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}`;
  await mongoose.connect(connectURI, {
    user: MONGO_DB_USERNAME,
    pass: MONGO_DB_PASSWORD,
    dbName: MONGO_DB_NAME,
  });
  console.log('Connected to MongoDB');
};

export const closeConnection = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
};
