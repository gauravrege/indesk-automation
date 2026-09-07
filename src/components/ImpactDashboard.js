'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const impactMetrics = [
  { value: 7, suffix: '', label: 'Projects Built', description: 'Automation scripts, dashboards, and web applications developed' },
  { value: 9090, suffix: '+', label: 'Data Rows Processed', description: 'Outstanding report records parsed and synced via scripts' },
  { value: 15, suffix: '+', label: 'Hours Automated Weekly', description: 'Manual workflows replaced with RPA bots and scripts' },
  { value: 14, suffix: '', label: 'Regions Covered', description: 'Geographic zones tracked in the financial dashboard' },
  { value: 3, suffix: '', label: 'Active Pipelines', description: 'Automated data flows running across Google Sheets and APIs' },
  { value: 100, suffix: '%', label: 'End-to-End Automation', description: 'From raw data extraction to formatted summary reports' },
];

export default function ImpactDashboard() {
  return (
    <section id="impact" className="relative z-20 -mt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group p-5 rounded-[1.5rem] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="mb-4">
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-[#1c1c1e]">
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                </h3>
              </div>
              <div className="border-t border-gray-200/50 pt-3">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {metric.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
