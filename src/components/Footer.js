'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Magnetic from './Magnetic';

const EASE = [0.22, 1, 0.36, 1];

const links = [
  { label: 'GitHub', href: 'https://github.com/gauravrege' },
  // LinkedIn intentionally omitted until the real profile URL is known —
  // a dead link reads worse than no link at all.
];

/**
 * Local time in Mumbai, ticking. Rendered empty on the server and filled in
 * after mount, because a clock that renders on the server is a guaranteed
 * hydration mismatch.
 */
function LocalTime() {
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

  return (
    <span className="flex items-center gap-2.5">
      <span
        className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--sand)]"
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] tabular-nums tracking-[0.24em] text-[var(--bone-4)]">
        {now || '--:--:--'} IST
      </span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="atmosphere relative overflow-hidden pb-14 pt-32 md:pt-44">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE }}
          className="mb-10 flex items-center justify-center gap-6"
        >
          <p className="eyebrow">Mumbai</p>
          <span className="h-3 w-px bg-[var(--hair-2)]" aria-hidden="true" />
          <LocalTime />
        </motion.div>

        <Reveal
          text="Gaurav Rege"
          as="p"
          stagger={0.045}
          duration={1.4}
          className="font-display block whitespace-nowrap text-center text-[15vw] leading-[0.86] text-[var(--bone)] md:text-[10rem]"
        />

        <div className="rule-fade mt-24" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
          className="mt-9 flex flex-col items-center justify-between gap-7 md:flex-row"
        >
          <p className="eyebrow order-2 md:order-1">
            &copy; {new Date().getFullYear()} &nbsp;/&nbsp; Automation Engineer
          </p>

          <div className="order-1 flex items-center gap-9 md:order-2">
            {links.map((link) => (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-wipe text-[0.74rem] uppercase tracking-[0.22em] text-[var(--bone-3)] transition-colors duration-500 hover:text-[var(--sand)]"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.5}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-4 text-[var(--bone-4)] transition-colors duration-500 hover:text-[var(--sand)]"
                aria-label="Back to top"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M8 15V2M3 7l5-5 5 5" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
