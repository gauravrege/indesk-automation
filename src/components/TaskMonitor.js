'use client';

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const tasks = [
  {
    id: 1,
    title: 'Statement Consolidation Rollout',
    description:
      'Customer Statement Transformer delivered and in use. Next: widen it to the remaining branch statement formats.',
    status: 'In Progress',
    tone: 'live',
    accent: 'var(--verified)',
    chip: 'border-[#2c6146]/25 bg-[#2c6146]/[0.08] text-[#245239]',
  },
  {
    id: 2,
    title: 'Invoice Match at Scale',
    description:
      'Invoice PDF matcher shipped. Next: run it across the shared network drives instead of one machine at a time.',
    status: 'Next Up',
    tone: 'queued',
    accent: 'var(--teal)',
    chip: 'border-[#0d4f52]/25 bg-[#0d4f52]/[0.08] text-[#0d4f52]',
  },
  {
    id: 3,
    title: 'RPA Pipeline Hardening',
    description:
      'Portal credentials moved out of source into environment variables. Next: scheduled unattended runs with failure alerts.',
    status: 'Backlog',
    tone: 'idle',
    accent: 'var(--ink-mute)',
    chip: 'border-[var(--line-strong)] bg-[var(--paper-warm)] text-[var(--ink-soft)]',
  },
];

export default function TaskMonitor() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--paper)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ochre)]"
          >
            What&rsquo;s Running
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="font-display mb-4 text-[2.75rem] leading-[1.05] text-[var(--ink)] md:text-6xl"
          >
            Mission <span className="italic text-[var(--ochre)]">Control</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mx-auto max-w-2xl text-lg text-[var(--ink-soft)]"
          >
            Live monitor of upcoming architecture upgrades and automation pipelines.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.65, delay: index * 0.09, ease: EASE }}
              whileHover={{ y: -5 }}
              className="lift group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-7"
            >
              {/* Accent spine */}
              <span
                className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-100 transition-opacity duration-300"
                style={{ backgroundColor: task.accent, opacity: 0.65 }}
                aria-hidden="true"
              />

              <div className="mb-5 flex items-start justify-between">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${task.chip}`}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    {task.tone === 'live' && (
                      <span
                        className="soft-ping absolute inline-flex h-full w-full rounded-full"
                        style={{ backgroundColor: task.accent }}
                      />
                    )}
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: task.accent }}
                    />
                  </span>
                  {task.status}
                </span>
                <span
                  className="text-[var(--ink-mute)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ink)]"
                  aria-hidden="true"
                >
                  &#8599;
                </span>
              </div>

              <h3 className="font-display mb-3 text-[1.55rem] leading-[1.12] text-[var(--ink)]">
                {task.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                {task.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
