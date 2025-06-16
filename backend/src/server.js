import app from './app.js';
import prisma from './config/prismaClient.js';

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL');

    app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
})();
