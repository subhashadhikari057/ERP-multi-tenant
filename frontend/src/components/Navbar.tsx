/* src/components/Navbar.tsx */
"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Modules", href: "#modules" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barClasses = `
    fixed top-0 w-full z-50 transition-all duration-300
    backdrop-blur-lg
    ${scrolled ? "bg-white/80 shadow-lg" : "bg-white/60 shadow-sm"}
  `;

  return (
    <nav className={barClasses}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-2">
          {/* ------------ Logo ------------ */}
          <a href="#home" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              NepalERP
            </span>
          </a>

          {/* ------------ Desktop Nav ------------ */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-medium text-gray-700 hover:text-indigo-600 transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full" />
              </a>
            ))}

            {/* Login */}
            <a
              href="/login"
              className="inline-flex items-center px-7 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-base font-semibold shadow-lg transition"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </a>
          </div>

          {/* ------------ Mobile Hamburger ------------ */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-indigo-600 transition"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ------------ Mobile Menu ------------ */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 mx-4 flex items-center justify-center px-7 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-base font-semibold shadow transition"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
