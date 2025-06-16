/**
 * User Controller
 * ----------------
 * Receives HTTP requests, delegates work to the service layer,
 * and converts errors to Express error handler via `next(err)`.
 */

import * as service from './user.service.js';

/* ---------- LOGIN ---------- */
export const login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/* ---------- CURRENT PROFILE ---------- */
export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};

/* ---------- CHANGE PASSWORD ---------- */
export const changePassword = async (req, res, next) => {
  try {
    await service.changePassword(req.user, req.body);
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

/* ---------- CREATE USER (Admin / Super Admin) ---------- */
export const createUser = async (req, res, next) => {
  try {
    const data = await service.createUser(req.user, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

/* ---------- DELETE USER ---------- */
export const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await service.deleteUser(req.user, userId);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
