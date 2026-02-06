/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import mongoose from 'mongoose';

/**
 * Custom modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { ConnectOptions } from 'mongoose';

/**
 * Client option
 */
const clientOptions: ConnectOptions = {
  dbName: 'blog_db',
  appName: 'Blog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Establishes a connection to the MongoDB using Monoose.
 * If an error occurs during connection process, it throws an error
 * with a descriptive message.
 *
 * -Uses 'MONGO-URI' as the connection string.
 * -'clientOptions' contains additional configuration for Mongoose.
 * -Errors are properly handled and renthrown for better debuggung.
 */

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO-URI is not defined in the configuration');
  }
  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);
    logger.info('Connected to the database successfully.', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    logger.error('Error connecting to the database', err);
  }
};

/**
 * Disconnects from the MongoDB databse using Mongoose.
 *
 * This function attemps to disconnect from the database asynchronously.
 * If the disconnection is succr=essful, a success message is logged.
 * If an error occurs, it is either re-thrown as a new Error (If it's a an instance of Error)
 * or logged to console.
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();

    logger.info('Disconnected from the database successfully.', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    logger.error('Error disconnecting from the database', err);
  }
};
