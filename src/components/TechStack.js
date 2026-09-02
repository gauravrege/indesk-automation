'use client';

import { motion } from 'framer-motion';

const techStack = [
  { name: 'JavaScript', category: 'Language' },
  { name: 'Next.js 14', category: 'Framework' },
  { name: 'Playwright', category: 'Automation' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Google Sheets API', category: 'Database' },
  { name: 'Tailwind CSS', category: 'Styling' },
];

export default function TechStack() {
  return (
    <section className="bg-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white"
          >
            Core Technologies
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#0a0a0a] border border-white/10 hover:bg-white/[0.04] transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">{tech.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
