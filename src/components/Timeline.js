'use client';

import { motion } from 'framer-motion';

export function TimelineCard({ log, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full mb-12 last:mb-0">
      {/* Glowing dot on the timeline line */}
      <div
        aria-hidden="true"
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-7 z-10 flex items-center justify-center"
      >
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-40" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-tr from-purple-500 to-blue-500 ring-4 ring-gray-950 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
        </span>
      </div>

      {/* Animated Card Container */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
        className={`w-full pl-14 md:pl-0 md:w-1/2 ${
          isEven
            ? 'md:mr-auto md:pr-10'
            : 'md:ml-auto md:pl-10'
        }`}
      >
        <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
          {/* Header: Week badge & Date */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm">
              Week {log.week}
            </span>
            {log.date && (
              <span className="text-xs md:text-sm text-gray-400 font-medium">
                {log.date}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
            {log.title}
          </h3>

          {/* Tags */}
          {log.tags && log.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {log.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rendered HTML Markdown Content */}
          <div
            className="text-gray-300 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-gray-300 [&_p]:text-gray-400 [&_p]:mt-2 [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-purple-300 [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: log.htmlContent }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline({ logs = [] }) {
  if (!logs || logs.length === 0) {
    return (
      <section className="bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent mb-4">
          Weekly Changelog
        </h2>
        <p>No changelog entries found yet.</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              Weekly Changelog
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400 max-w-xl mx-auto">
              A week-by-week timeline of engineering progress, technical solutions, and milestone deliveries.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-7 bottom-7 -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500/20"
          />

          {/* Timeline Items */}
          <div className="relative">
            {logs.map((log, index) => (
              <TimelineCard key={log.week ?? index} log={log} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
