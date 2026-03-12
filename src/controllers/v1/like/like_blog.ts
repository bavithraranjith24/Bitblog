/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Custom modules
 */

import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/blog';
import like from '@/models/like';
import Like from '@/models/like';

/**
 * Types
 */

import type { Request, Response } from 'express';

const likeBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const { userId } = req.body;

  try {
    const blog = await Blog.findById(blogId).select('likeCount').exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }
    const existingLike = await Like.findOne({ blogId, userId }).lean().exec();

    if (existingLike) {
      res.status(400).json({
        code: 'Bad Request',
        message: 'You already liked this blog',
      });
      return;
    }

    await Like.create({ blogId, userId });

    blog.likeCount++;
    await blog.save();

    logger.info('Blog liked successfully', {
      userId,
      blogId: blog._id,
      likeCount: blog.likeCount,
    });

    res.status(200).json({
      likeCount: blog.likeCount,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while liking blog', err);
  }
};
export default likeBlog;
