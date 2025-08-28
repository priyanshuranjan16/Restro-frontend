"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function POSInterface() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="w-full bg-white py-4 px-6"
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
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
  <span className="relative font-caveat">
    An interface for{" "}
    <span className="relative inline-block">
      efficient
      <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-500 transform -skew-x-12 opacity-80"></span>
    </span>{" "}
    and{" "}
    <span className="relative inline-block">
      fast service
      <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-500 transform -skew-x-12 opacity-80"></span>
    </span>
  </span>
</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience lightning-fast ordering with our intuitive POS system designed for modern restaurants
          </p>
        </motion.div>

        {/* POS Interface Display */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: false }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto"
        >
          {/* Interface Image */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              viewport={{ once: false }}
            >
              <Image
                src="/foodinterface.png"
                alt="RestroSphere POS Interface"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
