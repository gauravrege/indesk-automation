'use client';

import { motion } from 'framer-motion';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

const tasks = [
  {
    id: 1,
    state: 'Active',
    title: 'Airline GST invoices, handed over',
    description:
      'Week 11. Reads invoices from 13 airlines, PDF or HTML, and writes them all into one sheet. Anything it cannot read it names and explains, instead of filling in a zero. Next: a parser for each airline still not covered.',
    current: true,
  },
  {
    id: 2,
    state: 'Queued',
    title: 'Statement layouts still being skipped',
    description:
      'Week 09, delivered and in use. Sheets are grouped by how their columns are laid out and the most common layout wins, so anything shaped differently is skipped and named rather than read wrongly. Next: the branch layouts it keeps skipping.',
    current: false,
  },
  {
    id: 3,
    state: 'Queued',
    title: 'Invoice match across the shared drives',
    description:
      'Week 10. Reads a list of invoice numbers from a spreadsheet, then searches every drive on the machine for the PDFs that match. Next: point it at the shared drives instead of one PC at a time.',
    current: false,
  },
  {
    id: 4,
    state: 'Later',
    title: 'Put the portal bot on a schedule',
    description:
      'Week 04. The daily portal round runs on its own now. Next: give it a fixed time to run, and an alert when an export comes back empty.',
    current: false,
  },
];

export default function TaskMonitor() {
  return (
    <section id="now" className="relative px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-14 flex items-end justify-between gap-6 border-b border-[var(--hair)] pb-6"
        >
          <div>
            <p className="eyebrow mb-5">As of 21 September 2026</p>
            <Decode
              text="In progress"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">
            {String(tasks.length).padStart(2, '0')} open
          </p>
        </motion.div>

        <ul>
          {tasks.map((task, i) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -70px 0px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              className="sweep edge-draw group grid grid-cols-1 gap-x-10 gap-y-4 border-b border-[var(--hair)] px-2 py-8 md:grid-cols-[9rem_1fr] md:py-10"
            >
              <p
                className={`eyebrow flex items-center gap-2.5 pt-1 ${
                  task.current ? 'text-[var(--flare)]' : ''
                }`}
              >
                {task.current ? (
                  <span className="pulse-dot" aria-hidden="true" />
                ) : (
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full border border-[var(--ink-4)]"
                    aria-hidden="true"
                  />
                )}
                {task.state}
              </p>

              <div className="min-w-0">
                <h3 className="font-display text-[1.35rem] leading-[1.14] text-[var(--ink)] transition-transform duration-700 group-hover:translate-x-1.5 md:text-[1.75rem]">
                  {task.title}
                  {task.current && <span className="caret" aria-hidden="true" />}
                </h3>
                <p className="mt-3 max-w-2xl text-[0.88rem] leading-[1.85] text-[var(--ink-3)]">
                  {task.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
