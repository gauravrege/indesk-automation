'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const techStack = [
  'JavaScript',
  'Python',
  'Node.js',
  'Next.js',
  'Playwright',
  'Google Apps Script',
  'Sheets API',
  'Tailwind',
  'Framer Motion',
  'GitHub CLI',
];

/** Keeps a value inside [min, max) by wrapping it around. */
function wrap(min, max, v) {
  const span = max - min;
  return ((((v - min) % span) + span) % span) + min;
}

export default function TechStack() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 48,
    stiffness: 380,
  });

  // Scrolling down drives the row left and faster; scrolling up reverses it.
  const velocityFactor = useTransform(smoothVelocity, [-1400, 0, 1400], [-4, 0, 4], {
    clamp: false,
  });
  // A touch of shear in the direction of travel. Purely a transform.
  const skew = useTransform(smoothVelocity, [-1400, 0, 1400], [3.5, 0, -3.5], {
    clamp: false,
  });

  // The track holds two identical copies, so wrapping at -50% is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const drift = -1.35 * (delta / 1000); // % of track per second, at rest
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    baseX.set(baseX.get() + drift + direction.current * drift * factor);
  });

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="eyebrow text-center"
        >
          Instruments
        </motion.p>
      </div>

      {/* Plain words, drifting — and the drift answers to the scroll wheel.
          No pills, no borders, no icons; the restraint is the design. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
        style={{ skewX: reduce ? 0 : skew }}
        className="marquee-mask relative flex overflow-hidden"
      >
        <motion.div
          style={{ x: reduce ? '0%' : x }}
          className="flex shrink-0 items-center will-change-transform"
        >
          {[...techStack, ...techStack].map((name, i) => (
            <span key={`${name}-${i}`} className="flex shrink-0 items-center">
              <span className="font-display whitespace-nowrap px-8 text-[1.75rem] text-[var(--bone-3)] transition-colors duration-700 hover:text-[var(--bone)] md:px-12 md:text-[2.5rem]">
                {name}
              </span>
              <span
                className="h-1 w-1 shrink-0 rotate-45 bg-[var(--sand-dim)]"
                aria-hidden="true"
              />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
