'use client';

import { motion } from 'framer-motion';

export default function ImpactDashboard({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="bg-black py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {metric.value}
                </h3>
                {metric.suffix && (
                  <span className="text-lg font-medium text-gray-600">
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
