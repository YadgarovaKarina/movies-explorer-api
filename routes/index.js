import { Router } from 'express';

import { userBodyValidator, userLoginValidator } from '../validators/userValidator.js';
import { router as userRouter } from './users.js';
import { router as moviesRouter } from './movies.js';
import { login, createUser } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';

export const router = Router();

router.post('/signin', userLoginValidator, login);
router.post('/signup', userBodyValidator, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
