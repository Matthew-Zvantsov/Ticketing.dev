import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validationHandler } from '../middlewares/validation-handler'
import { User } from '../models/user-model';
import { Password } from '../utils/password-util';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin' , 
  [
    body('email')
      .isEmail()
      .withMessage('Email should be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password should not be empty')
  ],
  validationHandler,
  async (req: Request, res: Response) => {

    const {email , password } = req.body;

    const user = await User.findOne({email});
    if (!user){
      throw new BadRequestError('Invalid credentials');
    }

    const isPassCorrect = await Password.compare(user.password, password );

    if(!isPassCorrect){
      throw new BadRequestError('Invalid credentials');
    }

    const newToken = jwt.sign({
      id: user._id,
      email: user.email
    }, 
    process.env.JWT_KEY!);

    req.session = {jwt: newToken};

    res.status(200).send(user);
  }
);

export { router as signinRouter };