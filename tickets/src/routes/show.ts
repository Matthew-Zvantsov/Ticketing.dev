import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@mz_ticketing/common';
import { Ticket } from "../models/ticket-model";

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket){
      throw new NotFoundError();
    }

    res.send(ticket).status(200);
})

export {router as showTicketsRouter}