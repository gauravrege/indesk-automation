'use client';

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const links = [
  { label: 'GitHub', href: 'https://github.com/gauravrege' },
  // LinkedIn intentionally omitted until the real profile URL is known —
  // a dead link reads worse than no link at all.
];

export default function Footer() {
  return (
    /* Dark close. The page runs light -> dark log panel -> light -> dark, so it
       finishes on weight instead of fading out on cream. */
    <footer className="on-dark relative overflow-hidden bg-[var(--obsidian)] pb-12 pt-24">
      <div className="atmosphere-dark pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--gold)]"
        >
          Built &amp; Shipped in Mumbai
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
          className="font-display whitespace-nowrap text-center text-[13vw] leading-[0.9] text-[var(--cream)] md:text-[9rem]"
        >
          Gaurav Rege
        </motion.p>

        <div className="rule-fade-dark mt-14" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-[var(--cream-body)]">
              &copy; {new Date().getFullYear()} Gaurav Rege
            </p>
            <p className="mt-1 text-xs text-[var(--cream-soft)]">
              Automation Engineer Intern
            </p>
          </div>

          <div className="flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-sm font-medium text-[var(--cream-body)] transition-colors hover:text-[var(--gold)]"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[var(--gold)] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-dark-s)] text-[var(--cream-body)] transition-[background-color,transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"
              aria-label="Back to top"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
