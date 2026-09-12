'use client';

import { motion } from 'framer-motion';
import Decode from './Decode';
import Wipe from './Wipe';

const EASE = [0.22, 1, 0.36, 1];

/* Only what has actually been used in the projects on this site. */
const groups = [
  { key: 'Languages', items: ['JavaScript', 'Python'] },
  { key: 'Web', items: ['Node.js', 'Next.js', 'Tailwind', 'Framer Motion'] },
  { key: 'Automation', items: ['Playwright', 'Google Apps Script', 'Sheets API', 'GitHub CLI'] },
  { key: 'Data', items: ['xlsx', 'openpyxl', 'xlsxwriter', 'pyxlsb', 'pdf.js', 'ExcelJS'] },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-14 flex items-end justify-between gap-6 border-b border-[var(--hair)] pb-6"
        >
          <div>
            <p className="eyebrow mb-5">Tools and libraries actually used</p>
            <Decode
              text="The stack"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">
            {String(groups.reduce((n, g) => n + g.items.length, 0)).padStart(2, '0')} tools
          </p>
        </motion.div>

        <div className="space-y-px">
          {groups.map((group, gi) => (
            <div
              key={group.key}
              className="grid grid-cols-1 gap-x-10 gap-y-5 border-b border-[var(--hair)] py-8 md:grid-cols-[11rem_1fr] md:py-10"
            >
              <p className="eyebrow pt-1">
                {String(gi + 1).padStart(2, '0')} / {group.key}
              </p>

              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item, i) => (
                  /* Each name is uncovered by a curtain sliding off it,
                     rather than by moving the name itself — the type
                     stays sharp because it never travels. */
                  <Wipe
                    key={item}
                    delay={gi * 0.08 + i * 0.055}
                    duration={0.7}
                    className="inline-block"
                  >
                    <span className="chip block border border-[var(--hair)] px-4 py-2.5 font-mono text-[11px] tracking-[0.1em] text-[var(--ink-2)] transition-colors duration-500">
                      {item}
                    </span>
                  </Wipe>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
