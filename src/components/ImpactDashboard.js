'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const EASE = [0.16, 1, 0.3, 1];

/** Counts up on first scroll into view, decelerating into the final value. */
function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  const count = useMotionValue(0);
  const smooth = useSpring(count, { stiffness: 62, damping: 20, mass: 0.9 });
  // A spring approaches its target asymptotically, so it can rest a hair below
  // and round DOWN — 10,000 rendering as 9,999. Snap once we are within one unit.
  const text = useTransform(smooth, (v) =>
    (target - v < 1 ? target : Math.round(v)).toLocaleString('en-US')
  );

  useEffect(() => {
    if (isInView) count.set(target);
  }, [isInView, target, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      <span className="text-[0.55em] align-super font-sans font-normal">{suffix}</span>
    </span>
  );
}

const impactMetrics = [
  { value: 10, suffix: '', accent: 'var(--teal)', label: 'Projects Shipped', description: 'Automation tools, dashboards and web apps built and delivered during the internship' },
  { value: 10000, suffix: '+', accent: 'var(--teal)', label: 'Rows Consolidated Per Run', description: 'Statement transactions merged and tagged with their customer in a single pass' },
  { value: 40, suffix: '+', accent: 'var(--teal)', label: 'Sheets Merged At Once', description: 'Separate customer sheets pulled into one reconciled table, across multiple workbooks' },
  { value: 30, suffix: 's', accent: 'var(--ochre)', label: 'Replaces A Full Working Day', description: 'Statement consolidation that took a full day by hand now finishes in about thirty seconds' },
  { value: 15, suffix: '+', accent: 'var(--ochre)', label: 'Hours Automated Weekly', description: 'Manual workflows replaced with RPA bots and scripts' },
  { value: 100, suffix: '%', accent: 'var(--verified)', label: 'Balance-Checked Accuracy', description: 'Every merged sheet proved against its own printed total before the file is released' },
];

export default function ImpactDashboard() {
  return (
    /* The overhang scales with the breakpoint. A flat -mt-32 collided with the
       hero buttons on short laptop screens. */
    <section
      id="impact"
      className="relative z-20 -mt-16 px-4 pb-24 sm:-mt-20 sm:px-6 lg:-mt-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
              whileHover={{ y: -5 }}
              className="lift group cursor-default overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(21,21,26,0.04)]"
            >
              <span
                className="mb-4 block h-[3px] w-8 rounded-full transition-[width] duration-500 group-hover:w-14"
                style={{ backgroundColor: metric.accent }}
                aria-hidden="true"
              />

              <h3 className="font-display text-[2.1rem] leading-none text-[var(--ink)] md:text-[2.4rem]">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </h3>

              <p className="mt-3 text-[0.8rem] font-semibold leading-snug text-[var(--ink-body)]">
                {metric.label}
              </p>
              <p className="mt-1.5 max-h-0 overflow-hidden text-[11px] leading-snug text-[var(--ink-mute)] opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
