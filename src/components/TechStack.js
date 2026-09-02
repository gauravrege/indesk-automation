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
    <section className="bg-[#f5f4f2] py-24 md:py-32 px-4 sm:px-6 lg:px-8 rounded-t-[3rem]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#1c1c1e] mb-16">
          Designed for Scale
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="px-8 py-6 rounded-full bg-white/50 shadow-sm border border-white/60 hover:bg-white transition-colors"
            >
              <p className="text-lg font-medium text-[#1c1c1e]">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
