'use client';

import { motion } from 'framer-motion';

const technologies = [
  {
    name: 'Node.js',
    description: 'Runtime for building the automation scripts',
    icon: '🟢',
  },
  {
    name: 'Playwright',
    description: 'Browser automation and UI testing framework',
    icon: '🎭',
  },
  {
    name: 'Google Cloud',
    description: 'Cloud platform for Sheets API integration',
    icon: '☁️',
  },
  {
    name: 'JavaScript',
    description: 'Primary programming language (ES6+)',
    icon: '⚡',
  },
  {
    name: 'Excel/XLSX',
    description: 'Data parsing and transformation',
    icon: '📑',
  },
  {
    name: 'Git & GitHub',
    description: 'Version control and code hosting',
    icon: '🔧',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function TechStack() {
  return (
    <section className="w-full bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Core technologies and tools powering the automation pipeline and data workflows.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/80 transition-colors duration-300 shadow-lg shadow-black/20 flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl sm:text-5xl mb-4 block select-none" role="img" aria-label={tech.name}>
                  {tech.icon}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {tech.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
