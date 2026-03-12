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
import Like from '@/models/like';

/**
 * Types
 */

import type { Request, Response } from 'express';

const unlikeBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const { userId } = req.body;

  try {
    const existingLike = await Like.findOne({ userId, blogId }).lean().exec();

    if (!existingLike) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Like not found',
      });
      return;
    }
    await Like.deleteOne({ _id: existingLike._id });

    const blog = await Blog.findById(blogId).select('likeCount').exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }
    blog.likeCount--;
    await blog.save();

    logger.info('Blog unliked successfully', {
      userId,
      blogId: blog._id,
      likeCount: blog.likeCount,
    });

    res.status(204);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
    logger.error('Error while unliking blog', err);
  }
};
export default unlikeBlog;
