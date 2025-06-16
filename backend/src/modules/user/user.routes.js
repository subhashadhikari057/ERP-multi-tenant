/**
 *  User Routes
 *  -----------------------------
 *  Handles all authentication & user-management routes:
 *
 *  🔐 Auth Routes:
 *  - POST   /auth/login             → login()
 *  - GET    /auth/me                → get current user info (token required)
 *  - POST   /auth/change-password   → update own password (token required)
 *
 *  👤 User Management Routes:
 *  - POST   /auth/users             → create user (admin / super_admin only)
 *  - DELETE /auth/users/:id         → soft-delete user (admin / super_admin only)
 *  - GET    /auth/users             → list all active users (admin / super_admin only)
 *  - PUT    /auth/users/:id         → update user info (admin / super_admin only)
 *  - PUT    /auth/users/:id/restore → restore soft-deleted user (admin / super_admin only)
 */

import { Router } from 'express';
import {
  login,
  getProfile,
  changePassword,
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  restoreUser
} from './user.controller.js';

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';

const router = Router();

/* ----------------------------- AUTH ROUTES ----------------------------- */

// ✅ Login: slug + email + password (or super_admin with just email/password)
router.post('/login', login);

// ✅ Get current user info from token
router.get('/me', authMiddleware, getProfile);

// ✅ Change password for logged-in user
router.post('/change-password', authMiddleware, changePassword);

/* ------------------------ USER MANAGEMENT ROUTES ------------------------ */

// ✅ Create new user (admin = own tenant, super_admin = any tenant)
router.post(
  '/users',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  createUser
);

// ✅ Soft-delete user (sets deletedAt). Cannot delete yourself.
router.delete(
  '/users/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  deleteUser
);

// ✅ List all users (admin = own tenant, super_admin = all)
router.get(
  '/users',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  listUsers
);

// ✅ Update user (name/email/role). Cannot update yourself.
router.put(
  '/users/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  updateUser
);

// ✅ Restore soft-deleted user (admin = own tenant, super_admin = all)
router.put(
  '/users/:id/restore',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  restoreUser
);

export default router;
