import express from 'express';
import {currentUser} from '@mz_ticketing/common';
import {requireAuth} from '@mz_ticketing/common' //No needed for now (get null instead 401)

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req, res) => {
  res.send({currentUser: req.currentUser ?? null});
});

export { router as currentUserRouter };