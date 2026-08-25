import express from 'express';
import {currentUser} from '../middlewares/current-user';
import {requireAuth} from '../middlewares/require-auth' //No needed for now (get null instead 401)

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req, res) => {
  res.send({currentUser: req.currentUser ?? null});
});

export { router as currentUserRouter };