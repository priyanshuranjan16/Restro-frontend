"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is RestroSphere and how does it help restaurants?",
    answer: "RestroSphere is a comprehensive restaurant management platform that combines Point of Sale (POS) systems, business networking, and operational tools. It helps restaurants streamline operations, manage orders, track inventory, and connect with other businesses in the food industry."
  },
  {
    question: "How does the POS system work and what features does it include?",
    answer: "Our POS system provides real-time order management, payment processing, inventory tracking, and detailed reporting. It includes features like table management, menu customization, staff management, and integration with popular payment gateways for seamless transactions."
  },
  {
    question: "Can I integrate RestroSphere with my existing restaurant software?",
    answer: "Yes! RestroSphere is designed with open APIs and supports integration with most popular restaurant management software, accounting systems, and third-party delivery platforms. Our team can help you set up custom integrations based on your specific needs."
  },
  {
    question: "What kind of support and training do you provide?",
    answer: "We offer comprehensive onboarding, 24/7 customer support, and regular training sessions for your staff. Our support team is available via phone, email, and live chat to ensure you get the help you need when you need it."
  },
  {
    question: "Is RestroSphere suitable for small restaurants or only large chains?",
    answer: "RestroSphere is designed to scale with your business. We offer different pricing tiers and features that work for small family restaurants, food trucks, and large restaurant chains. You can start with basic features and upgrade as your business grows."
  },
  {
    question: "How secure is my restaurant's data on the platform?",
    answer: "Data security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with industry standards like PCI DSS for payment processing. Your data is backed up securely and protected against unauthorized access."
  },
  {
    question: "What are the costs involved and are there any hidden fees?",
    answer: "We offer transparent pricing with no hidden fees. Our pricing is based on the features you need and the size of your restaurant. We provide a free trial period so you can test the platform before committing, and there are no long-term contracts required."
  },
  {
    question: "How does the business networking feature benefit my restaurant?",
    answer: "Our business networking feature connects you with suppliers, other restaurants, and industry professionals. You can discover new suppliers, share best practices, collaborate on events, and build relationships that help grow your business and reduce costs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-caveat">
            Frequently Asked Questions
            
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about RestroSphere and how it can transform your restaurant business
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {faqData.map((item, index) => (
                         <motion.div
               key={index}
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               viewport={{ once: false }}
               className="mb-4"
             >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                 <button
                   onClick={() => toggleAccordion(index)}
                   className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                 >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Contact Support
            </button>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
