'use client';

import { motion } from 'framer-motion';

const tasks = [
  {
    id: 1,
    title: 'Statement Consolidation Rollout',
    description:
      'Customer Statement Transformer delivered and in use. Next: widen it to the remaining branch statement formats.',
    status: 'In Progress',
    tone: 'live',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 2,
    title: 'Invoice Match at Scale',
    description:
      'Invoice PDF matcher shipped. Next: run it across the shared network drives instead of one machine at a time.',
    status: 'Next Up',
    tone: 'queued',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 3,
    title: 'RPA Pipeline Hardening',
    description:
      'Portal credentials moved out of source into environment variables. Next: scheduled unattended runs with failure alerts.',
    status: 'Backlog',
    tone: 'idle',
    color: 'bg-gray-100 text-gray-700 border-gray-300',
  },
];

const dotColor = {
  live: 'bg-emerald-500',
  queued: 'bg-blue-500',
  idle: 'bg-gray-400',
};

export default function TaskMonitor() {
  return (
    <section className="border-t border-black/5 bg-[#f5f4f2] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400"
          >
            What&rsquo;s Running
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-4xl font-medium tracking-tight text-[#1c1c1e] md:text-5xl"
          >
            Mission Control
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-lg text-gray-500"
          >
            Live monitor of upcoming architecture upgrades and automation pipelines.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="shine-host group flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-6 flex items-start justify-between">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${task.color}`}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    {task.tone === 'live' && (
                      <span className={`soft-ping absolute inline-flex h-full w-full rounded-full ${dotColor[task.tone]}`} />
                    )}
                    <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotColor[task.tone]}`} />
                  </span>
                  {task.status}
                </span>
                <span className="text-gray-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black">
                  &#8599;
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#1c1c1e]">
                {task.title}
              </h3>
              <p className="leading-relaxed text-gray-500">{task.description}</p>

              {/* Rule sweeps in on hover */}
              <div className="mt-6 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-black/20 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
