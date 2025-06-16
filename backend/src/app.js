import express from 'express';
import cors from 'cors';
import tenantRoutes from './modules/tenant/tenant.routes.js';
import userRoutes   from './modules/user/user.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/tenant', tenantRoutes);
app.use('/auth',   userRoutes);

// Health check
app.get('/', (_, res) => res.send('ERP backend OK ✅'));

export default app;
