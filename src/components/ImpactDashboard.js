'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

/**
 * Counts up to `target` on first scroll into view. Spring-driven, so it
 * decelerates into the final number instead of stopping dead.
 */
function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  const count = useMotionValue(0);
  const smooth = useSpring(count, { stiffness: 60, damping: 18, mass: 0.9 });
  const text = useTransform(smooth, (v) => Math.round(v).toLocaleString('en-US'));

  useEffect(() => {
    if (isInView) count.set(target);
  }, [isInView, target, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}

const impactMetrics = [
  { value: 10, suffix: '', label: 'Projects Shipped', description: 'Automation tools, dashboards and web apps built and delivered during the internship' },
  { value: 10000, suffix: '+', label: 'Rows Consolidated Per Run', description: 'Statement transactions merged and tagged with their customer in a single pass' },
  { value: 40, suffix: '+', label: 'Sheets Merged At Once', description: 'Separate customer sheets pulled into one reconciled table, across multiple workbooks' },
  { value: 30, suffix: 's', label: 'Replaces A Full Working Day', description: 'Statement consolidation that took a full day by hand now finishes in about thirty seconds' },
  { value: 15, suffix: '+', label: 'Hours Automated Weekly', description: 'Manual workflows replaced with RPA bots and scripts' },
  { value: 100, suffix: '%', label: 'Balance-Checked Accuracy', description: 'Every merged sheet proved against its own printed total before the file is released' },
];

export default function ImpactDashboard() {
  return (
    <section id="impact" className="relative z-20 -mt-32 px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 34, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{
                duration: 0.75,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="shine-host group cursor-default rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.16)]"
            >
              <div className="mb-4">
                <h3 className="text-3xl font-light tracking-tight text-[#1c1c1e] md:text-4xl">
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                </h3>
              </div>

              {/* Rule grows out from the left as the card appears */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="mb-3 h-px origin-left bg-gray-200/70"
              />

              <p className="text-sm font-semibold leading-tight text-gray-800">
                {metric.label}
              </p>
              <p className="mt-1 max-h-0 overflow-hidden text-[11px] leading-snug text-gray-400 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
