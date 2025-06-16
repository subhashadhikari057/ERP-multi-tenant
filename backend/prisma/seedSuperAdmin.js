import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seedSuperAdmin = async () => {
  const PASSWORD = 'Root2025@';

  const superRole = await prisma.role.findUnique({
    where: { name: 'super_admin' }
  });

  if (!superRole) {
    console.error('❌ Role "super_admin" not found. Seed roles first.');
    return;
  }

  await prisma.user.upsert({
    where: { email: 'root@erp.com' },
    update: {},
    create: {
      name: 'Root',
      email: 'root@erp.com',
      password: await bcrypt.hash(PASSWORD, 10),
      roleId: superRole.id,
      tenantId: null  // Super admin has no tenant
    }
  });

  console.log('✅ Super-admin user created: root@erp.com / Root2025@');
  await prisma.$disconnect();
};

seedSuperAdmin();
