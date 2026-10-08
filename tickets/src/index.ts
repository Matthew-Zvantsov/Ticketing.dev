import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@mz_ticketing/common';
import { app } from './app';

const start = async () => {
  
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY env variable must be provided');
  }
  
  try {
    await mongoose.connect('mongodb://tickets-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (err) {
    throw new DatabaseConnectionError('Mogo DB connection error');
  }

  app.listen(4000, () => {
    console.log('Listening port 4000');
  });
};

start();