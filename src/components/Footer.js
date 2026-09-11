'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const links = [
  { label: 'GitHub', href: 'https://github.com/gauravrege' },
  // LinkedIn intentionally omitted until the real profile URL is known —
  // a dead link reads worse than no link at all.
];

export default function Footer() {
  return (
    <footer className="atmosphere relative overflow-hidden pb-14 pt-32 md:pt-44">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE }}
          className="eyebrow mb-10 text-center"
        >
          Mumbai
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.1, ease: EASE }}
          className="font-display whitespace-nowrap text-center text-[15vw] leading-[0.86] text-[var(--bone)] md:text-[10rem]"
        >
          Gaurav Rege
        </motion.p>

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
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe text-[0.74rem] uppercase tracking-[0.22em] text-[var(--bone-3)] transition-colors duration-500 hover:text-[var(--sand)]"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-4 text-[var(--bone-4)] transition-all duration-500 hover:-translate-y-0.5 hover:text-[var(--sand)]"
              aria-label="Back to top"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M8 15V2M3 7l5-5 5 5" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
