"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-8 bg-white"
    >
      {/* Logo */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center"
      >
        <span className="text-2xl font-bold text-gray-800 font-caveat">
          RestroSphere
        </span>
      </motion.div>

      {/* Center Navigation Links */}
      <motion.ul 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden md:flex items-center gap-8 text-gray-700 font-medium"
      >
        <motion.li 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1"
        >
          <Link href="#" className="hover:text-purple-600 transition-colors">Point of Sale</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.li>
        
        {/* Separator */}
        <div className="w-px h-4 bg-gray-300"></div>
        
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">Restaurant</Link>
        </motion.li>
        
        {/* Separator */}
        <div className="w-px h-4 bg-gray-300"></div>
        
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="hover:text-purple-600 transition-colors">Material</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="hover:text-purple-600 transition-colors">Q&A</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="hover:text-purple-600 transition-colors">Features</Link>
        </motion.li>
      </motion.ul>

      {/* Actions */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-6"
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
            Log in
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="#"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Free trial
          </Link>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
