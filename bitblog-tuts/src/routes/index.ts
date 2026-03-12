/**
 * @copyright 2026 Bavithra R
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { createBrowserRouter } from 'react-router';
/**
 * Loaders
 */

/**
 * Pages
 */
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';

/**
 * Actions
 */
import signupAction from '@/routes/actions/auth/signup';

/**
 * Error boundaries
 */

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: Signup,
    action: signupAction,
  },
  {
    path: '/refresh-token',
  },
  {
    path: '/',
    children: [
      {
        index: true,
      },
      {
        path: 'blogs',
      },
      {
        path: 'blogs/:slug',
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'dashboard',
      },
      {
        path: 'blogs',
      },
      {
        path: 'blogs/create',
      },
      {
        path: 'blogs/:slug/edit',
      },
      {
        path: 'comments',
      },
      {
        path: 'users',
      },
    ],
  },
  {
    path: '/settings',
  },
]);
export default router;
