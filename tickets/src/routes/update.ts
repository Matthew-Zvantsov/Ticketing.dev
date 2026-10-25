import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validationHandler, NotAuthorizedError, NotFoundError } from '@mz_ticketing/common';
import { Ticket } from "../models/ticket-model";

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, 
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater then zero')
  ], 
  validationHandler, 
  async (req: Request, res: Response) => {
    
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket){
      throw new NotFoundError();
    }

    if(!req.currentUser || ( req.currentUser.id !== ticket.userId ) ){
      throw new NotAuthorizedError();
    }
    
    const { title, price } = req.body;

    ticket.set({
      title: title,
      price: price
    });

    await ticket.save();
    
    res.status(201).send(ticket);
})

export {router as updateTicketsRouter}