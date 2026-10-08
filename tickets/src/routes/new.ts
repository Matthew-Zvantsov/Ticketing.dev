import express, {Request, Response} from 'express';
import {requireAuth} from '@mz_ticketing/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  res.status(200);
})

export {router as createTicketsRouter}