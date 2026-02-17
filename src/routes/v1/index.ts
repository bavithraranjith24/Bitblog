/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';

const router = Router();

/**
 * Routes
 */
import authRoutes from '@/routes/v1/auth';
import userRoutes from '@/routes/v1/user';

/**
 * Root route
 */
router.get('/', (_req, res) => {
  res.status(200).json({
    message: 'API is Live',
    status: 'ok',
    version: '1.0.0',
    docs: 'https://docs.blog_api.codewithsadee.com',
    timeStamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
