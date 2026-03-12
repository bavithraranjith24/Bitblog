/**
 * @copyright 2026 Bavithra R
 * @license Apache-2.0
 */

/**
 *Node modules
 */
import axios from 'axios';

export const bitblogApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});
