'use client';

import { motion } from 'framer-motion';

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

/** One pass of the ribbon. Rendered twice so the loop is seamless. */
function Row({ items, reverse = false }) {
  return (
    <div className="marquee-wrap marquee-mask relative flex overflow-hidden">
      <div
        className="marquee-track flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-white/60 bg-white/60 px-7 py-5 shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-white"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/20 transition-colors duration-300 group-hover:bg-black/70" />
            <span className="whitespace-nowrap text-lg font-medium text-[#1c1c1e]">
              {tech.name}
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
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
    <section className="relative overflow-hidden rounded-t-[3rem] bg-[#f5f4f2] py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400"
        >
          The Toolkit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-medium tracking-tight text-[#1c1c1e] md:text-5xl"
        >
          Designed for Scale
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-4 md:gap-6"
      >
        <Row items={techStack.slice(0, half)} />
        <Row items={techStack.slice(half)} reverse />
      </motion.div>
    </section>
  );
}
