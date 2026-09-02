'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/bg-moon.jpg)' }}
      />
      {/* Soft gradient overlay so text is readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#e6e9f0]/40 via-transparent to-[#f5f4f2]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-[-10vh]">
        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-base tracking-widest uppercase text-gray-700 font-semibold mb-4"
        >
          Automation Engineer Intern
        </motion.p>

        {/* Large Elegant Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-[#1c1c1e] mb-6 leading-[1.1]"
        >
          My work is<br/>
          <span className="opacity-90">rebuilding systems</span>
        </motion.h1>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-4 items-center mt-6"
        >
          <a href="#gallery" className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:scale-105 transition-transform">
            View Gallery ↗
          </a>
          <a href="#impact" className="px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/40 text-black text-sm font-medium hover:bg-white/70 transition-colors">
            See Impact
          </a>
        </motion.div>
      </div>
    </section>
  );
}
