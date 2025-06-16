import jwt from 'jsonwebtoken';

/**
 * Sign a JWT that carries userId, tenantId, and the **role name**.
 * Expires in 24 h.
 */
export const signToken = ({ userId, tenantId, role }) =>
  jwt.sign({ userId, tenantId, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

/** Verify token and return the decoded payload. */
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
