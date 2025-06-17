/* src/components/home/About.tsx */
"use client";

import { motion, type Variants } from "framer-motion";
import { Globe, Layers, Users, Target } from "lucide-react";

/* ---------------- data ---------------- */
const features = [
  {
    icon: Globe,
    title: "Local Business Focus",
    description:
      "Built around Nepali regulations and day-to-day workflows.",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description:
      "Enable only the modules you need and add more as you scale.",
  },
  {
    icon: Users,
    title: "Multi-Tenant Ready",
    description:
      "Run multiple organizations securely on a single platform.",
  },
  {
    icon: Target,
    title: "Precision Built",
    description:
      "Every feature crafted with attention to local requirements.",
  },
];

/* ---------------- motion helpers ---------------- */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-gray-50 via-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* -------- header -------- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
            About&nbsp;NepalERP
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-snug break-words">
  <span className="block">Built for Nepal,</span>
  <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    Designed for Growth
  </span>
</h2>


          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            NepalERP is more than software—it's a complete business solution
            tailored to the challenges and ambitions of Nepali enterprises.
            Start small, expand effortlessly, and run multiple organizations
            securely on one scalable platform.
          </p>
        </div>

        {/* -------- cards -------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={card}
              className="
                rounded-2xl p-8 shadow-sm hover:shadow-lg transition
                bg-gradient-to-br from-white/80 via-indigo-50/60 to-purple-50/50
                backdrop-blur-md
              "
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-6 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-center">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
