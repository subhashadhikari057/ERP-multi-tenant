/**
 *  User Routes
 *  -----------------------------
 *  POST   /auth/login           → login()
 *  GET    /auth/me              → getProfile()         (auth)
 *  POST   /auth/change-password → changePassword()     (auth)
 *
 *  POST   /users                → createUser()         (auth + role: admin | super_admin)
 *  DELETE /users/:id            → deleteUser()         (auth + role: admin | super_admin)
 */

import { Router } from 'express';
import {
  login,
  getProfile,
  changePassword,
  createUser,
  deleteUser
} from './user.controller.js';

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';

const router = Router();

/* ---------- Auth endpoints ---------- */
router.post('/login', login);
router.get('/me', authMiddleware, getProfile);
router.post('/change-password', authMiddleware, changePassword);

/* ---------- User-management endpoints ---------- */
router.post(
  '/users',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  createUser
);

router.delete(
  '/users/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  deleteUser
);

export default router;
