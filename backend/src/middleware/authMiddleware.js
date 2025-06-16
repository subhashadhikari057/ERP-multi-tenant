import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token  = header.split(' ')[1];
    if (!token) throw new Error('No token');

    const decoded = verifyToken(token);
    req.user = decoded;             // { userId, tenantId, role }
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
