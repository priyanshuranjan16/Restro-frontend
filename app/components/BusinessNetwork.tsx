"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BusinessNetwork() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="relative font-caveat">
              Multi-Location Business Network
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-500 transform -skew-x-12 opacity-80"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Seamlessly manage your restaurant empire across multiple locations
            with our integrated system
          </p>
        </motion.div>

        {/* Buildings + Pins */}
        <div className="relative w-full flex justify-center">
          {/* Background Image (sketch buildings) */}
          <Image
            src="/building 1.png" // <-- replace with your uploaded image path in /public
            alt="Business Network"
            width={1200}
            height={700}
            className="w-full h-auto"
            priority
          />

          {/* Outlet Pin */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="absolute top-[31%] left-[16%] flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-medium shadow-md">
              OUTLET
            </span>
          </motion.div>

          {/* Head Office Pin */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
            className="absolute top-[21%] right-[24%] flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-medium shadow-md">
              HEAD OFFICE
            </span>
          </motion.div>

          {/* Central Kitchen Pin */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false }}
            className="absolute bottom-[26%] left-[40%] flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-medium shadow-md">
              CENTRAL KITCHEN
            </span>
          </motion.div>

          {/* Franchise Pin */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: false }}
            className="absolute bottom-[47%] right-[1%] flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-medium shadow-md">
              FRANCHISE
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
