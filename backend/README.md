# ERP System (MERN + PostgreSQL)

This is a modular ERP software built for multi-tenant usage. Initially developed for RRBS Construction, it includes core modules like:

- 🔐 Authentication with role-based access
- 🏢 Tenant/company registration
- 👥 User management (admin, super_admin)
- 📦 Inventory Management (coming next)
- 💼 HR & Payroll, Finance modules (upcoming)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, Prisma ORM
- **Frontend:** React.js (setup coming)
- **Database:** PostgreSQL
- **Auth:** JWT-based

## 📁 Structure

ERP/
├── backend/
└── frontend/ (in progress)



## 🚀 Setup

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
