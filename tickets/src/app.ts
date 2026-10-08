import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {errorHandler, NotFoundError, currentUser } from '@mz_ticketing/common';
import {createTicketsRouter} from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: false //process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(createTicketsRouter);

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

app.all('*' , async (req, res) => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app }