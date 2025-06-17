"use client";

import {
  Shield,
  Zap,
  Users,
  Globe,
  Layers,
  Clock,
} from "lucide-react";

/* ------------ data ------------ */
const benefits = [
  {
    icon: Globe,
    title: "Tailored for Nepal",
    desc: "Built specifically for Nepali business practices, regulations, and market dynamics",
  },
  {
    icon: Users,
    title: "Role-Based Dashboards",
    desc: "Personalised interfaces so each team member sees exactly what they need",
  },
  {
    icon: Zap,
    title: "Modern Web Stack",
    desc: "Lightning-fast performance powered by a cutting-edge tech stack",
  },
  {
    icon: Shield,
    title: "Enterprise-grade Security",
    desc: "Bank-level encryption with comprehensive data protection & compliance",
  },
  {
    icon: Layers,
    title: "Seamless Scalability",
    desc: "Grows effortlessly from startup to enterprise with no performance drop",
  },
  {
    icon: Clock,
    title: "24 / 7 Local Support",
    desc: "Round-the-clock Nepali support team ready to assist your business",
  },
];

/* ------------ component ------------ */
export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* header */}
        <header className="text-center mb-14 sm:mb-16">
          <span className="inline-block px-4 py-2 mb-4 sm:mb-5 rounded-full bg-white/10 text-xs sm:text-sm font-medium">
            Why&nbsp;Choose&nbsp;NepalERP
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 sm:mb-6 leading-snug">
            Built&nbsp;Different,&nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Built&nbsp;Better
            </span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-indigo-100">
            We understand the unique challenges of Nepali businesses and have crafted solutions that solve them head-on.
          </p>
        </header>

        {/* benefit cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/10 to-white/5
                         transition-transform duration-150 hover:scale-[1.04]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mb-5 sm:mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA stripe */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-white/10 rounded-3xl px-6 py-10 sm:px-10 sm:py-12 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your Business?
            </h3>
            <p className="text-sm sm:text-base text-indigo-100 mb-6 sm:mb-8">
              Join hundreds of Nepali companies already streamlining operations with NepalERP.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-sm hover:scale-105 transition">
                Start&nbsp;Your&nbsp;Journey
              </button>
              <button className="px-6 sm:px-8 py-3 rounded-2xl border border-white/30 font-semibold text-sm hover:bg-white/10 transition">
                Schedule&nbsp;Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
