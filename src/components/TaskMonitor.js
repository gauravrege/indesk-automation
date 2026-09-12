'use client';

import { motion } from 'framer-motion';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

const tasks = [
  {
    id: 1,
    state: 'Active',
    title: 'Statement consolidation rollout',
    description:
      'Delivered in week 09 and in use. Sheets are grouped by column layout and the most common layout wins, so anything shaped differently is skipped by name. Next: the branch statement layouts currently being skipped that way.',
    current: true,
  },
  {
    id: 2,
    state: 'Queued',
    title: 'Invoice match across the network drives',
    description:
      'Week 10. Reads invoice numbers from a spreadsheet, strips separators, then walks every drive on the machine for PDFs whose names match. Next: point it at the shared drives instead of one PC at a time.',
    current: false,
  },
  {
    id: 3,
    state: 'Later',
    title: 'Unattended runs for the portal bot',
    description:
      'Week 04. The portal password now comes from a .env file and the Chrome session profile is out of version control. Next: put the run on a schedule, with an alert when an export comes back empty.',
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
            <p className="eyebrow mb-5">As of 12 September 2026</p>
            <Decode
              text="In progress"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">03 open</p>
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
