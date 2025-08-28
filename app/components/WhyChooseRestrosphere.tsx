"use client";

import { motion } from "framer-motion";

export default function WhyChooseRestrosphere() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2l3.293 3.293a1 1 0 01.293.707V8a1 1 0 01-1 1h-3a1 1 0 01-1-1V3a1 1 0 011-1z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7l6 6m0-6l-6 6" />
        </svg>
      ),
      title: "Uninterrupted billing operations",
      description: "Experience smooth checkout with tablet, mobile, and desktop-based Touch POS systems that ensure smooth checkout, even offline."
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
        </svg>
      ),
      title: "Effortless food aggregator integration",
      description: "Manage all your online orders from various food aggregators, like Swiggy and Zomato, on a single screen and simplify your online presence."
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Inventory management",
      description: "Cut down wastage, lower food costs, optimize menu offerings, and boost profits by automating the process of planning, monitoring, and controlling your inventory."
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2l3.293 3.293a1 1 0 01.293.707V8a1 1 0 01-1 1h-3a1 1 0 01-1-1V3a1 1 0 011-1z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m-6 4h6m-6 4h6" />
        </svg>
      ),
      title: "Prepare, plan, and provide",
      description: "Establish a comprehensive production plan, manage Bill of materials, calculate accurate production costs, and prepare every dish with the perfect blend of ingredients."
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="w-full bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            <span className="relative font-caveat">
              Why choose RestroSphere ?
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 bg-blue-500 transform -skew-x-12 opacity-80"></span>
            </span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: false }}
              className="text-center"
            >
              {/* Icon Container */}
              <div className="relative mb-4 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <div className="text-orange-500">
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
