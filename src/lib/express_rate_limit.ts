/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { rateLimit } from 'express-rate-limit';
import { error } from 'node:console';

// configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 60000, // 1 minute time window for requests limiting
  limit: 60, //Allow a maximum of 60 requests per window per IP
  standardHeaders: 'draft-8', //Use the latest standers rate-limit headers
  legacyHeaders: false, //Disable the deprecated X-RateLimit headers
  message: {
    error:
      'You have send too many requests ina given amount of time. please try again later.',
  },
});
export default limiter;
