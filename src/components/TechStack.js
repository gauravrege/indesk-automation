'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* Each entry names what it was actually used FOR. A bare logo wall says
   nothing; this says where the tool earned its place. */
const techStack = [
  {
    name: 'Node.js',
    use: 'The statement transformer and the ticket parser. Also the zero-dependency .xlsx reader and writer, built on the built-in zlib module.',
  },
  {
    name: 'Python',
    use: 'The resume parser and the invoice matcher — walking every drive on a machine, normalising filenames, writing audit workbooks.',
  },
  {
    name: 'Playwright',
    use: 'Driving the InDesk portal unattended: login, iframe traversal, report export, download capture, against a persistent browser profile.',
  },
  {
    name: 'Google Apps Script',
    use: 'An 800-line sync engine behind the Outstanding Report, plus the email dispatch automation running inside Sheets.',
  },
  {
    name: 'Google Sheets API',
    use: 'Publishing exported reports straight into live workbooks — clearing tabs, rewriting values, and formatting the summary through batchUpdate.',
  },
  {
    name: 'Next.js',
    use: 'This site. App Router, statically generated, with every weekly log parsed from markdown at build time.',
  },
  {
    name: 'Tailwind CSS',
    use: 'The design system here — one palette, one type scale, and animation kept to transform and opacity so it holds sixty frames a second.',
  },
  {
    name: 'Git & GitHub CLI',
    use: 'Every tool ships to its own public repository. Repos are created and pushed from the terminal as part of the same workflow.',
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mb-14 flex items-baseline justify-between gap-6 border-b border-[var(--hair)] pb-6"
        >
          <h2 className="font-display text-[2.4rem] leading-none text-[var(--bone)] md:text-[3.25rem]">
            Instruments
          </h2>
          <p className="eyebrow shrink-0 tabular-nums">
            {String(techStack.length).padStart(2, '0')}
          </p>
        </motion.div>

        <ul>
          {techStack.map((tech, idx) => (
            <motion.li
              key={tech.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.9, delay: Math.min(idx, 5) * 0.06, ease: EASE }}
              className="group grid grid-cols-1 gap-x-10 gap-y-2 border-b border-[var(--hair)] py-7 transition-colors duration-700 hover:bg-white/[0.015] md:grid-cols-12"
            >
              <h3 className="font-display text-[1.4rem] leading-tight text-[var(--bone)] transition-colors duration-700 group-hover:text-[var(--sand)] md:col-span-4 md:text-[1.6rem]">
                {tech.name}
              </h3>
              <p className="text-[0.88rem] leading-[1.85] text-[var(--bone-3)] md:col-span-8">
                {tech.use}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
