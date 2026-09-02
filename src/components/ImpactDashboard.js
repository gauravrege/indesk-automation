'use client';

import { motion } from 'framer-motion';

export default function ImpactDashboard({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="impact" className="relative z-20 -mt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 min-w-[200px] max-w-[280px] p-6 rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:bg-white transition-colors cursor-default"
            >
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-800">
                  {metric.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Performance metric</p>
              </div>
              <div className="flex items-baseline gap-1 border-t border-gray-200/50 pt-4">
                <h3 className="text-4xl md:text-5xl font-normal tracking-tight text-[#1c1c1e]">
                  {metric.value}
                </h3>
                {metric.suffix && (
                  <span className="text-xl text-gray-600">
                    {metric.suffix}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
