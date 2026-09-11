'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const tasks = [
  {
    id: 1,
    state: 'Active',
    title: 'Statement Consolidation Rollout',
    description:
      'Customer Statement Transformer delivered and in use. Next: widen it to the remaining branch statement formats.',
    current: true,
  },
  {
    id: 2,
    state: 'Queued',
    title: 'Invoice Match at Scale',
    description:
      'Invoice PDF matcher shipped. Next: run it across the shared network drives instead of one machine at a time.',
    current: false,
  },
  {
    id: 3,
    state: 'Later',
    title: 'RPA Pipeline Hardening',
    description:
      'Portal credentials moved out of source into environment variables. Next: scheduled unattended runs with failure alerts.',
    current: false,
  },
];

export default function TaskMonitor() {
  return (
    <section className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mb-14 flex items-baseline justify-between gap-6 border-b border-[var(--hair)] pb-6"
        >
          <h2 className="font-display text-[2.4rem] leading-none text-[var(--bone)] md:text-[3.25rem]">
            In Progress
          </h2>
          <p className="eyebrow shrink-0">Current</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-[var(--hair)] md:grid-cols-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -70px 0px' }}
              transition={{ duration: 1.1, delay: index * 0.1, ease: EASE }}
              className="edge-draw group relative bg-[var(--void)] p-8 transition-colors duration-700 hover:bg-[var(--surface)] md:p-10"
            >
              <p
                className={`eyebrow mb-8 ${
                  task.current ? 'text-[var(--sand)]' : ''
                }`}
              >
                {task.state}
              </p>

              <h3 className="font-display mb-4 text-[1.5rem] leading-[1.18] text-[var(--bone)] md:text-[1.7rem]">
                {task.title}
              </h3>
              <p className="text-[0.86rem] leading-[1.85] text-[var(--bone-3)]">
                {task.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
