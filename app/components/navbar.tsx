"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm"
    >
      {/* Logo */}
      <Link href="/">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <span className="text-xl sm:text-2xl font-bold text-gray-800 font-caveat">
            RestroSphere
          </span>
        </motion.div>
      </Link>

      {/* Desktop Navigation Links */}
      <motion.ul 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-700 font-medium"
      >
        <motion.li 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1"
        >
          <Link href="#" className="hover:text-purple-600 transition-colors text-sm xl:text-base">Point of Sale</Link>
          <svg className="w-3 h-3 xl:w-4 xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.li>
        
        {/* Separator */}
        <div className="w-px h-4 bg-gray-300"></div>
        
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors text-sm xl:text-base">Restaurant</Link>
        </motion.li>
        
        {/* Separator */}
        <div className="w-px h-4 bg-gray-300"></div>
        
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="hover:text-purple-600 transition-colors text-sm xl:text-base">Material</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="hover:text-purple-600 transition-colors text-sm xl:text-base">Q&A</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link href="#" className="hover:text-purple-600 transition-colors text-sm xl:text-base">Features</Link>
        </motion.li>
      </motion.ul>

      {/* Desktop Actions */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden md:flex items-center gap-4 lg:gap-6"
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm lg:text-base">
            Log in
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="#"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-medium transition-colors text-sm lg:text-base"
          >
            Free trial
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onClick={toggleMobileMenu}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="text-xl font-bold text-gray-800 font-caveat">Menu</span>
                <button
                  onClick={toggleMobileMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 p-6">
                <ul className="space-y-4">
                  <li>
                    <Link 
                      href="#" 
                      className="flex items-center justify-between py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                      onClick={toggleMobileMenu}
                    >
                      <span>Point of Sale</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="block py-3 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Restaurant
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="block py-3 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Material
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="block py-3 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Q&A
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="block py-3 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Features
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Mobile Actions */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <Link
                  href="#"
                  className="block w-full text-center py-3 text-gray-600 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  Log in
                </Link>
                <Link
                  href="#"
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Free trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
