import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler } from '@mz_ticketing/common';
import { NotFoundError } from '@mz_ticketing/common';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: false //process.env.NODE_ENV !== 'test'
}));

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

app.all('*' , async (req, res) => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app }