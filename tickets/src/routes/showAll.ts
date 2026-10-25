import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@mz_ticketing/common';
import { Ticket } from "../models/ticket-model";

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    if (!tickets.length){
      throw new NotFoundError();
    }

    res.send(tickets).status(200);
})

export {router as showAllTicketsRouter}