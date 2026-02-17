/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';
import { param, query, body } from 'express-validator';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import validationError from '@/middlewares/validationError';
import authorize from '@/middlewares/authorize';

/**
 * Controllers
 */
import getCurrentUser from '@/controllers/v1/user/get_current_user';
import updateCurrentUser from '@/controllers/v1/user/update_current_user';

/**
 * Models
 */

import User from '@/models/user';

const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  getCurrentUser,
);

router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  updateCurrentUser,
);

export default router;
