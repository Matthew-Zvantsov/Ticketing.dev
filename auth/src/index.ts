import mongoose from 'mongoose';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { app } from './app';

const start = async () => {
  
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY env variable must be provided');
  }
  
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (err) {
    throw new DatabaseConnectionError('Mogo DB connection error');
  }

  app.listen(4000, () => {
    console.log('Listening port 4000');
  });
};

start();