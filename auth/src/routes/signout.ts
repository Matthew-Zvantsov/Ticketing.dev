import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signout' , (req: Request, res: Response) => {
  try {
    req.session = null;
    res.send({});
  } catch (error) {
    console.error('Signout error:', error);
    throw error;
  }
});

export { router as signoutRouter };