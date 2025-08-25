"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"   // 👈 put your logo image in public/logo.png
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-2xl font-bold text-purple-800">Odoo</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li><Link href="#">Point of Sale</Link></li>
        <li><Link href="#">Restaurant</Link></li>
        <li><Link href="#">Material</Link></li>
        <li><Link href="#">Q&A</Link></li>
        <li><Link href="#">Features</Link></li>
      </ul>

      {/* Actions */}
      <div className="flex gap-4">
        <Link href="#" className="text-gray-600 hover:text-purple-600">Log in</Link>
        <Link
          href="#"
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md font-medium"
        >
          Free trial
        </Link>
      </div>
    </nav>
  );
}
