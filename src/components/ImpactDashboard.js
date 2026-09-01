'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import metricsData from '../../content/metrics.json';

function MetricCard({ metric, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const target = Number(metric.value) || 0;
    if (target === 0) {
      setCount(0);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = Math.max(Math.floor(duration / steps), 16);
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, metric.value]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-cyan-500/5"
    >
      {/* Subtle card interior highlight */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-50" />

      {/* Metric Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-3xl shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <span role="img" aria-label={metric.label}>
          {metric.icon}
        </span>
      </div>

      {/* Animated Number & Suffix */}
      <div className="mb-2 flex items-baseline font-bold tracking-tight text-white">
        <span className="text-4xl sm:text-5xl font-extrabold">
          {count.toLocaleString()}
        </span>
        {metric.suffix && (
          <span className="ml-1 text-3xl sm:text-4xl font-extrabold text-cyan-400">
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Metric Label */}
      <p className="text-sm font-medium text-gray-400 sm:text-base leading-snug">
        {metric.label}
      </p>
    </motion.div>
  );
}

export default function ImpactDashboard() {
  const containerRef = useRef(null);
  const isHeaderInView = useInView(containerRef, { once: true, margin: '-40px' });
  const metrics = metricsData?.metrics || [];

  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Gradient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="h-[450px] w-[700px] -translate-y-12 rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/15 blur-3xl" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 text-center"
        >
          <h2 className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            Impact &amp; Value Delivered
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg">
            Measurable results and automation milestones achieved throughout the internship.
          </p>
        </motion.div>

        {/* Responsive Grid of Metric Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label || index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
