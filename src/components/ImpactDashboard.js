'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const EASE = [0.22, 1, 0.36, 1];

/** Counts up once, slowly, on first sight. */
function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  const count = useMotionValue(0);
  const smooth = useSpring(count, { stiffness: 34, damping: 22, mass: 1.1 });
  // A spring approaches asymptotically, so it can rest a hair below and round
  // DOWN — 10,000 rendering as 9,999. Snap once within one unit.
  const text = useTransform(smooth, (v) =>
    (target - v < 1 ? target : Math.round(v)).toLocaleString('en-US')
  );

  useEffect(() => {
    if (isInView) count.set(target);
  }, [isInView, target, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      <span className="align-super text-[0.42em] tracking-normal">{suffix}</span>
    </span>
  );
}

const impactMetrics = [
  { value: 10, suffix: '', label: 'Projects' },
  { value: 10000, suffix: '+', label: 'Rows / run' },
  { value: 40, suffix: '+', label: 'Sheets merged' },
  { value: 30, suffix: 's', label: 'Replaces a day' },
  { value: 15, suffix: '+', label: 'Hours / week' },
  { value: 100, suffix: '%', label: 'Reconciled' },
];

export default function ImpactDashboard() {
  return (
    /* A band, not a dashboard. Hairlines instead of cards, and no negative
       margin — so nothing above can ever overlap it. */
    <section id="impact" className="relative px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="rule-fade mb-14" aria-hidden="true" />

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -70px 0px' }}
              transition={{ duration: 1.2, delay: index * 0.09, ease: EASE }}
              className="group px-5 text-center lg:border-l lg:border-[var(--hair)] lg:first:border-l-0"
            >
              <p className="font-display text-[2.4rem] leading-none text-[var(--bone)] transition-colors duration-700 group-hover:text-[var(--sand)] md:text-[2.9rem]">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </p>
              <p className="eyebrow mt-4">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="rule-fade mt-14" aria-hidden="true" />
      </div>
    </section>
  );
}
