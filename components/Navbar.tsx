"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#1F2D3D] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* MAIN NAVIGATION */}
        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl sm:text-2xl font-bold text-white hover:text-amber-400 transition"
          >
            House of Chaliss
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-medium">

            <Link
              href="/"
              className="text-white hover:text-amber-400 transition"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-white hover:text-amber-400 transition"
            >
              Author
            </Link>

            <Link
              href="/books"
              className="text-white hover:text-amber-400 transition"
            >
              Books
            </Link>

            <Link
              href="/contact"
              className="text-white hover:text-amber-400 transition"
            >
              Contact
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden pb-4 pt-2 border-t border-white/10"
          >
            <div className="flex flex-col gap-1">

              <Link
                href="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 hover:text-amber-400 transition"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 hover:text-amber-400 transition"
              >
                Author
              </Link>

              <Link
                href="/books"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 hover:text-amber-400 transition"
              >
                Books
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 hover:text-amber-400 transition"
              >
                Contact
              </Link>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}