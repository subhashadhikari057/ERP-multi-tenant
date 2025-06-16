/**
 * User Service
 * -------------
 * Business logic for:
 *  - login()
 *  - changePassword()
 *  - createUser()
 *  - deleteUser()   (soft delete)
 *  - listUsers()
 *  - updateUser()
 *  - restoreUser()
 */

import prisma from '../../config/prismaClient.js';
import { signToken } from '../../utils/jwt.js';
import {
  comparePassword,
  hashPassword,
  isPasswordStrong
} from '../../utils/password.js';

/* ---------- LOGIN ---------- */
export const login = async ({ slug, email, password }) => {
  let user;
  let tenantId = null;

  if (slug) {
    // Normal tenant user login
    const tenant = await prisma.tenant.findUnique({ where: { slug } });
    if (!tenant) throw new Error('Invalid credentials');

    user = await prisma.user.findFirst({
      where: { email, tenantId: tenant.id, deletedAt: null },
      include: { role: true }
    });
    tenantId = tenant.id;
  } else {
    // Super-admin login (no slug)
    user = await prisma.user.findFirst({
      where: { email, role: { name: 'super_admin' }, deletedAt: null },
      include: { role: true }
    });
  }

  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({
    userId: user.id,
    tenantId,                  // null for super_admin
    role: user.role.name
  });

  return {
    token,
    user: { id: user.id, name: user.name, role: user.role.name }
  };
};

/* ---------- CHANGE PASSWORD ---------- */
export const changePassword = async (currentUser, { oldPassword, newPassword }) => {
  if (!isPasswordStrong(newPassword)) throw new Error('Password too weak');

  const user = await prisma.user.findUnique({ where: { id: currentUser.userId } });
  if (!user || !(await comparePassword(oldPassword, user.password))) {
    throw new Error('Old password incorrect');
  }

  const newHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: newHash }
  });
};

/* ---------- CREATE USER (Admin / Super Admin) ---------- */
export const createUser = async (currentUser, body) => {
  const { tenantSlug, name, email, password, role } = body;

  if (!isPasswordStrong(password)) throw new Error('Password too weak');

  // 1. Determine tenantId
  let tenantId;
  if (currentUser.role === 'super_admin') {
    if (!tenantSlug) throw new Error('tenantSlug required for super_admin');
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (!tenant) throw new Error('Tenant not found');
    tenantId = tenant.id;
  } else {
    tenantId = currentUser.tenantId;
  }

  // 2. Resolve roleId
  const roleRow = await prisma.role.findUnique({ where: { name: role } });
  if (!roleRow) throw new Error('Invalid role name');

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      roleId: roleRow.id,
      tenantId
    },
    include: { role: true }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
    tenantId: user.tenantId
  };
};

/* ---------- DELETE USER (Soft Delete) ---------- */
export const deleteUser = async (currentUser, targetUserId) => {
  // Block self-deletion
  if (currentUser.userId === targetUserId) {
    throw new Error('Cannot delete your own account');
  }

  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) throw new Error('User not found');

  // Admin may delete only within own tenant
  if (
    currentUser.role === 'admin' &&
    target.tenantId !== currentUser.tenantId
  ) {
    throw new Error('Forbidden');
  }

  // Soft delete by setting deletedAt
  await prisma.user.update({
    where: { id: targetUserId },
    data: { deletedAt: new Date() }
  });
};

/* ---------- LIST USERS ---------- */
export const listUsers = async (currentUser) => {
  const where =
    currentUser.role === 'super_admin'
      ? { deletedAt: null }
      : { tenantId: currentUser.tenantId, deletedAt: null };

  return prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      tenantId: true,
      role: { select: { name: true } }
    }
  });
};

/* ---------- UPDATE USER ---------- */
export const updateUser = async (currentUser, targetId, body) => {
  if (currentUser.userId === targetId) {
    throw new Error('Cannot modify your own account');
  }

  const target = await prisma.user.findUnique({
    where: { id: targetId },
    include: { role: true }
  });
  if (!target || target.deletedAt) throw new Error('User not found');

  // Admin may update only within own tenant
  if (
    currentUser.role === 'admin' &&
    target.tenantId !== currentUser.tenantId
  ) {
    throw new Error('Forbidden');
  }

  // Resolve new roleId if role change requested
  let roleId = target.roleId;
  if (body.role) {
    if (body.role === 'super_admin') throw new Error('Cannot assign super_admin');
    const roleRow = await prisma.role.findUnique({ where: { name: body.role } });
    if (!roleRow) throw new Error('Invalid role name');
    roleId = roleRow.id;
  }

  const updated = await prisma.user.update({
    where: { id: targetId },
    data: {
      name: body.name ?? target.name,
      email: body.email ?? target.email,
      roleId
    },
    include: { role: true }
  });

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role.name
  };
};

/* ---------- RESTORE USER ---------- */
export const restoreUser = async (currentUser, targetId) => {
  const target = await prisma.user.findUnique({ where: { id: targetId } });
  if (!target || !target.deletedAt) throw new Error('User not found or active');

  // Admin may restore only within own tenant
  if (
    currentUser.role === 'admin' &&
    target.tenantId !== currentUser.tenantId
  ) {
    throw new Error('Forbidden');
  }

  await prisma.user.update({
    where: { id: targetId },
    data: { deletedAt: null }
  });
};
