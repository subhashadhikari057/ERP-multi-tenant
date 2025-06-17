"use client";

import { motion, type Variants } from "framer-motion";
import {
  Users,
  Package,
  Calculator,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
  Truck,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* ❶  Module data */
const modules = [
  {
    icon: Users,
    title: "HR & Payroll",
    desc: "Complete staff management with automated salary processing and attendance tracking",
    feats: ["Employee Management", "Payroll Automation", "Attendance", "Leave"],
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Track stock levels across multiple sites with real-time inventory updates",
    feats: ["Multi-location Stock", "Real-time Tracking", "Low-stock Alerts", "Batch Mgmt"],
  },
  {
    icon: Calculator,
    title: "Finance & Accounting",
    desc: "Nepal tax-compliant bookkeeping with automated financial reporting",
    feats: ["VAT Compliance", "Reports", "Reconciliation", "Expenses"],
  },
  {
    icon: ShoppingCart,
    title: "Sales & CRM",
    desc: "Manage customer relationships and sales pipeline effectively",
    feats: ["Lead Management", "Sales Pipeline", "Customer Portal", "Quotes"],
  },
  {
    icon: FileText,
    title: "Project Management",
    desc: "Plan, execute, and monitor projects with integrated resource allocation",
    feats: ["Task Mgmt", "Resource Planning", "Time Tracking", "Project Reports"],
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    desc: "Advanced analytics and reporting for data-driven decisions",
    feats: ["Dashboards", "Advanced Reports", "Analytics", "KPI Tracking"],
  },
  {
    icon: Truck,
    title: "Supply Chain",
    desc: "Optimize procurement and vendor management processes",
    feats: ["Vendor Mgmt", "Purchase Orders", "Supply Planning", "Quality Control"],
  },
  {
    icon: Settings,
    title: "System Admin",
    desc: "Comprehensive system configuration and user management tools",
    feats: ["User Roles", "System Config", "Audit Trails", "Backups"],
  },
];

/* ------------------------------------------------------------------ */
/* ❷  Small fade-in variants */
const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

/* ------------------------------------------------------------------ */
/* ❸  Component */
export default function Modules() {
  return (
    <section id="modules" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ---------- Header ---------- */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
            Our&nbsp;Modules
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful&nbsp;Modules
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mix and match from our comprehensive suite to craft the perfect ERP for your business.
          </p>
        </div>

        {/* ---------- Card grid ---------- */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {modules.map(({ icon: Icon, title, desc, feats }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}            /* zoom on hover */
              className="group relative rounded-2xl p-6 bg-white shadow-md overflow-hidden transition"
            >
              {/* Gradient overlay – appears only on hover */}
              <div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.06) 100%)",
                }}
              />

              {/* Card content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 mb-4 rounded-lg bg-indigo-100 flex items-center justify-center transition
                                group-hover:bg-indigo-600">
                  <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                </div>

                {/* Title & description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{desc}</p>

                {/* Bullets */}
                <ul className="space-y-1 mb-6">
                  {feats.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <button
                  className="
                    inline-flex items-center justify-center w-full py-2 rounded-xl font-medium
                    text-indigo-600 transition-all duration-300
                    group-hover:bg-indigo-600 group-hover:text-white
                  "
                >
                  Learn&nbsp;More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
