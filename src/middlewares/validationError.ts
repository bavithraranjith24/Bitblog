/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { validationResult } from 'express-validator';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import { error } from 'node:console';

const validationError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      code: 'validationError',
      errors: errors.mapped(),
    });
    return;
  }
  next();
};

export default validationError;
