"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-12">
        {/* ---- top area ---- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* company */}
          <div className="sm:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="font-bold">N</span>
              </div>
              <span className="ml-3 text-lg font-semibold">NepalERP</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Modern, secure, and scalable ERP software tailored for Nepali
              businesses.
            </p>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                contact@nepalerp.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                +977-1-4567890
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Kathmandu, Nepal
              </li>
            </ul>
          </div>

          {/* quick links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                ["About", "#about"],
                ["Modules", "#modules"],
                ["Pricing", "#pricing"],
                ["Contact", "#contact"],
              ].map(([t, href]) => (
                <li key={t}>
                  <a
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                ["Help Center", "#help"],
                ["Docs", "#docs"],
                ["Training", "#training"],
                ["Community", "#community"],
              ].map(([t, href]) => (
                <li key={t}>
                  <a
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- bottom bar ---- */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            © {year} NepalERP. All rights reserved.
          </span>

          {/* socials & back-to-top */}
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
                aria-label="social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            <button
              onClick={scrollTop}
              aria-label="Scroll to top"
              className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
