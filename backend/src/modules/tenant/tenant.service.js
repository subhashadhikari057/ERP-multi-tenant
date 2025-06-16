import prisma from '../../config/prismaClient.js';
import { signToken } from '../../utils/jwt.js';
import {
  hashPassword,
  isPasswordStrong,
} from '../../utils/password.js';

/**
 * Create a tenant, its first admin user, and return a JWT.
 */
export const registerTenant = async ({
  tenantName,
  slug,
  adminName,
  adminEmail,
  adminPassword,
}) => {
  if (!isPasswordStrong(adminPassword)) {
    throw new Error('Password too weak');
  }

  // ── find the 'admin' role once ─────────────────────────────────
  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  if (!adminRole) throw new Error('Role "admin" not seeded');

  const pwHash = await hashPassword(adminPassword);

  const tenant = await prisma.tenant.create({
    data: {
      name: tenantName,
      slug,
      users: {
        create: {
          name: adminName,
          email: adminEmail,
          password: pwHash,
          roleId: adminRole.id,
        },
      },
    },
    include: { users: { include: { role: true } } },
  });

  const adminUser = tenant.users[0];

  const token = signToken({
    userId: adminUser.id,
    tenantId: tenant.id,
    role: adminUser.role.name, // ← role **name** goes into JWT
  });

  return {
    token,
    tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug },
    admin: {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role.name,
    },
  };
};
