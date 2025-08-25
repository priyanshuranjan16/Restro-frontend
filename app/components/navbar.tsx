"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-8 bg-white border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <span 
          className="text-2xl  text-gray-800"
          style={{ fontFamily: 'Dancing Script, cursive' }}
        >
          RestroSphere
        </span>
      </div>

      {/* Center Navigation Links */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li className="flex items-center gap-1">
          <Link href="#" className="hover:text-purple-600 transition-colors">Point of Sale</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </li>
        <li>
          <Link href="#" className="text-red-600 font-semibold hover:text-red-700 transition-colors">Restaurant</Link>
        </li>
        <li>
          <Link href="#" className="hover:text-purple-600 transition-colors">Material</Link>
        </li>
        <li>
          <Link href="#" className="hover:text-purple-600 transition-colors">Q&A</Link>
        </li>
        <li>
          <Link href="#" className="hover:text-purple-600 transition-colors">Features</Link>
        </li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
          Log in
        </Link>
        <Link
          href="#"
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          Free trial
        </Link>
      </div>
    </nav>
  );
}
