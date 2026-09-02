'use client';

import { motion } from 'framer-motion';

const tasks = [
  {
    id: 1,
    title: 'Two-Way Sync Engine',
    description: 'Establish bidirectional write-back capability for the 9,090-row Outstanding Report.',
    status: 'In Progress',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: 2,
    title: 'Automated Ticket Flagging',
    description: 'Write Python/Node scripts to auto-flag accounts sitting in "Blocked" status.',
    status: 'Next Up',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 3,
    title: 'Cloud OAuth2 Auth',
    description: 'Secure the dashboard behind Google Workspace enterprise authentication.',
    status: 'Backlog',
    color: 'bg-gray-200 text-gray-800 border-gray-300'
  }
];

export default function TaskMonitor() {
  return (
    <section className="bg-[#f5f4f2] py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium tracking-tight text-[#1c1c1e] mb-4"
          >
            Mission Control
          </motion.h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Live monitor of upcoming architecture upgrades and automation pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${task.color}`}>
                  {task.status}
                </span>
                <span className="text-gray-300 group-hover:text-black transition-colors">↗</span>
              </div>
              <h3 className="text-2xl font-medium text-[#1c1c1e] tracking-tight mb-3">
                {task.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {task.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
