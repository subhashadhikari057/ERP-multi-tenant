import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const roles = [
  'super_admin',
  'admin',
  'hr_manager',
  'accountant',
  'inventory_manager',
  'employee',
  'viewer'
];

await Promise.all(
  roles.map((name) =>
    prisma.role.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  )
);

console.log('✅ Base roles seeded');
await prisma.$disconnect();
