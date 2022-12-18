import { Router } from 'express';

import {
  updateUserProfile,
  readOne,
} from '../controllers/users.js';

import {
  userProfileValidator,
} from '../validators/userValidator.js';

export const router = Router();

router.get('/me', readOne);
router.patch('/me', userProfileValidator, updateUserProfile);
