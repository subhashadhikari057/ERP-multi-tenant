import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/prismaClient.js';   // ← NEW import

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token  = header.split(' ')[1];
    if (!token) throw new Error('No token');

    // 1. Decode JWT
    const decoded = verifyToken(token);   // { userId, tenantId, role }

    // 2. Re-fetch user to ensure account is still active
    const liveUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { deletedAt: true, tenantId: true, role: { select: { name: true } } }
    });

    if (!liveUser || liveUser.deletedAt) {
      throw new Error('Account inactive');
    }

    // 3. Attach fresh user info to request
    req.user = {
      ...decoded,
      role: liveUser.role.name,          // in case role has changed
      tenantId: liveUser.tenantId        // in case tenant was updated
    };

    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
