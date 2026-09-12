'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Mumbai time, ticking. Empty on the server and filled in after mount —
    a clock rendered on the server is a guaranteed hydration mismatch. */
function Clock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now || '--:--:--'}</span>;
}

/**
 * A bar that is not there while you are reading the hero, then drops in
 * once you have left it and stays for the rest of the page.
 *
 * The scroll value is read through a motion value and only written to
 * React state when it actually crosses the threshold, so scrolling does
 * not re-render this component sixty times a second.
 */
export default function StickyHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const [shown, setShown] = useState(false);

  const rail = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > window.innerHeight * 0.72;
    setShown((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: shown ? '0%' : '-100%' }}
      transition={{ duration: 0.55, ease: EASE }}
      className="fixed inset-x-0 top-0 z-[70] border-b border-[var(--hair)] bg-[var(--void)]/92"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-display text-[0.95rem] tracking-[-0.02em] text-[var(--ink)] transition-colors duration-400 hover:text-[var(--flare)]"
        >
          Gaurav Rege
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            ['How', '#how'],
            ['Work', '#work'],
            ['Numbers', '#impact'],
            ['Stack', '#stack'],
            ['Now', '#now'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="link-wipe font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-3)] transition-colors duration-400 hover:text-[var(--ink)]"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="eyebrow flex items-center gap-2.5">
          <span className="pulse-dot" aria-hidden="true" />
          <Clock />
        </p>
      </div>

      {/* Progress, drawn along the bottom edge of the bar. */}
      <motion.div
        style={{ scaleX: rail }}
        className="h-px origin-left bg-[var(--flare)]"
        aria-hidden="true"
      />
    </motion.header>
  );
}
