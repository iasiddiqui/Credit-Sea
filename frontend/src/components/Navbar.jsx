import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Credit<span className="text-yellow-300">Sea</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/upload" className="hover:text-yellow-300 transition">Upload</Link>
          <Link to="/reports" className="hover:text-yellow-300 transition">Reports</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 py-3 space-y-2 text-center">
          <Link
            to="/"
            className="block hover:bg-blue-800 py-2 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/upload"
            className="block hover:bg-blue-800 py-2 transition"
            onClick={() => setMenuOpen(false)}
          >
            Upload
          </Link>
          <Link
            to="/reports"
            className="block hover:bg-blue-800 py-2 transition"
            onClick={() => setMenuOpen(false)}
          >
            Reports
          </Link>
        </div>
      )}
    </nav>
  );
}
