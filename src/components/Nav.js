'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const sections = [
  { id: 'index', label: 'Work' },
  { id: 'impact', label: 'Numbers' },
  { id: 'code', label: 'Engineering' },
  { id: 'next', label: 'Next' },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  /* Hidden over the hero, then slides down. Reading the motion value in a
     listener keeps this off the React render path — no re-render per frame. */
  useMotionValueEvent(scrollY, 'change', (y) => {
    const past = y > (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 700);
    setShown((was) => (was === past ? was : past));
  });

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.header
      initial={false}
      animate={{ y: shown ? 0 : '-105%' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hair)] bg-[var(--void)]/95"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display shrink-0 text-[1.05rem] text-[var(--bone)] transition-colors duration-500 hover:text-[var(--sand)]"
        >
          Gaurav Rege
        </button>

        <div className="flex items-center gap-5 sm:gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              className="link-wipe hidden text-[0.7rem] uppercase tracking-[0.2em] text-[var(--bone-4)] transition-colors duration-500 hover:text-[var(--bone)] sm:inline-block"
            >
              {s.label}
            </button>
          ))}
          <a
            href="https://github.com/gauravrege"
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe shrink-0 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--bone-3)] transition-colors duration-500 hover:text-[var(--sand)]"
          >
            GitHub
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
