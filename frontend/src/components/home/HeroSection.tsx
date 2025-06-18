"use client";

/* eslint-disable react/no-unescaped-entities */
import {
  Users,
  Building2,
  Shield,
  Zap,
  ScrollText,
  HardHat,
  BarChart3,
  UserCog,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

const modules = [
  { icon: Users, label: "HR" },
  { icon: Building2, label: "Inventory" },
  { icon: Shield, label: "Security" },
  { icon: Zap, label: "Performance" },
  { icon: ScrollText, label: "Billing" },
  { icon: HardHat, label: "Projects" },
  { icon: BarChart3, label: "Analytics" },
  { icon: UserCog, label: "Roles" },
  { icon: ShoppingCart, label: "Procurement" },
];

export default function HeroSection() {
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [radius, setRadius] = useState(170);

  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setSpot({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // 🔁 Update orbit radius based on screen size
  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 768 ? 110 : 170);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-100"
    >
      {/* 💡 Mouse-follow spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,.15) 0%, transparent 50%)`,
        }}
      />

      {/* 📐 Responsive 2-column layout */}
      <div
        className="
          relative z-10 max-w-7xl mx-auto px-6
          grid grid-cols-1 lg:grid-cols-2
          items-center min-h-screen
          pt-20
          gap-y-20
          lg:gap-y-0
          lg:gap-x-28
        "
      >
        {/* ========== LEFT ========== */}
        <div className="space-y-8 text-center lg:text-left px-4 sm:px-0">
          <span className="
  inline-flex items-center px-4 py-2 rounded-full bg-white shadow
  text-sm font-medium text-gray-800
  mt-6  /* ⬅️ pushes badge down on very small screens */
  sm:mt-0  /* ⬅️ resets margin-top to 0 from 640 px upward */
">
  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse" />
  Designed for Nepali Businesses
</span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight break-words">
  Transform Your{" "}
  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    Business with Smart ERP
  </span>
</h1>
          <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
            Modular, secure, and scalable ERP crafted for Nepal. Handle HR,
            inventory, finance, and more—without the headache.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg transition">
              Learn&nbsp;More
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* 📊 Stats */}
          <div className="grid grid-cols-3 gap-6 pt-10 text-center">
            {[
              { n: "500+", t: "Companies" },
              { n: "99.9%", t: "Uptime" },
              { n: "24/7", t: "Support" },
            ].map((s) => (
              <div key={s.t}>
                <div className="text-2xl font-bold text-gray-900">{s.n}</div>
                <div className="text-gray-600 text-sm">{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== RIGHT CIRCLE ========== */}
        <div
          className="
            relative
            w-[280px] h-[280px]
            sm:w-[320px] sm:h-[320px]
            md:w-[400px] md:h-[400px]
            lg:w-[460px] lg:h-[460px]
            mx-auto
          "
        >
          {/* 🔘 Central Circle with Gradient */}
          <div
            className="absolute inset-0 rounded-full shadow-xl flex flex-col items-center justify-center z-10"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #ffffff 0%, #f3f4ff 60%, #e6e8ff 100%)",
            }}
          >
            <div className="text-3xl lg:text-4xl font-bold text-gray-900">
              10+
            </div>
            <div className="text-gray-600 text-sm">Modules</div>
          </div>

          {/* 🔁 Orbiting icons that stay upright */}
          <div
            className="absolute inset-0 origin-center z-20 animate-spin-slow"
            style={{ animationDuration: "28s" }}
          >
            {modules.map((m, i) => {
              const angle = (i / modules.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={m.label}
                  style={{
                    left: `calc(50% + ${x}px - 2rem)`,
                    top: `calc(50% + ${y}px - 2rem)`,
                  }}
                  className="absolute w-16 h-16 bg-white rounded-xl shadow flex flex-col items-center justify-center text-gray-700 text-[11px]"
                >
                  <div className="flex flex-col items-center justify-center w-full h-full animate-spin-slow-reverse">
                    <m.icon className="w-5 h-5 text-indigo-600 mb-0.5" />
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ✅ Bottom trust label */}
      <p className="absolute bottom-8 inset-x-0 text-center text-sm text-gray-500 opacity-70">
        Trusted by leading companies
      </p>

      {/* 🌀 Keyframe animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg);}
          to { transform: rotate(-360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 28s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
