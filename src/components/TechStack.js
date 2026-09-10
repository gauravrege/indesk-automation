'use client';

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const techStack = [
  { name: 'JavaScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Next.js 16', category: 'Framework' },
  { name: 'Playwright', category: 'Automation' },
  { name: 'Google Apps Script', category: 'Automation' },
  { name: 'Google Sheets API', category: 'Data' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Motion' },
  { name: 'GitHub CLI', category: 'Tooling' },
];

/** One ribbon. Items are duplicated so the -50% loop is seamless. */
function Row({ items, reverse = false }) {
  return (
    <div className="marquee-wrap marquee-mask relative flex overflow-hidden">
      <div
        className="marquee-track flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-4 transition-colors duration-300 hover:border-[var(--teal)]"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)]/35 transition-colors duration-300 group-hover:bg-[var(--teal)]"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap text-base font-medium text-[var(--ink)]">
              {tech.name}
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-mute)]">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const half = Math.ceil(techStack.length / 2);

  return (
    <section className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--paper-warm)] py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]"
        >
          The Toolkit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-3xl font-medium tracking-[-0.03em] text-[var(--ink)] md:text-5xl"
        >
          Designed for Scale
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex flex-col gap-3 md:gap-4"
      >
        <Row items={techStack.slice(0, half)} />
        <Row items={techStack.slice(half)} reverse />
      </motion.div>
    </section>
  );
}
