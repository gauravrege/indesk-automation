'use client';

import { motion } from 'framer-motion';

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

export default function TechStack() {
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

      {/* Plain words, drifting. No pills, no borders, no icons — the
          restraint is the design. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
        className="marquee-wrap marquee-mask relative flex overflow-hidden"
      >
        <div className="marquee-track flex shrink-0 items-center">
          {[...techStack, ...techStack].map((name, i) => (
            <span key={`${name}-${i}`} className="flex shrink-0 items-center">
              <span className="font-display whitespace-nowrap px-8 text-[1.75rem] text-[var(--bone-3)] transition-colors duration-700 hover:text-[var(--bone)] md:px-12 md:text-[2.5rem]">
                {name}
              </span>
              <span className="h-1 w-1 shrink-0 rotate-45 bg-[var(--sand-dim)]" aria-hidden="true" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
