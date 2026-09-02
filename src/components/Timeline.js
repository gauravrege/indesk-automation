'use client';

import { motion } from 'framer-motion';

export function TimelineCard({ log, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className="flex flex-col h-full"
    >
      <div className="group flex-1 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.04]">
        
        {/* Header: Week badge & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-black bg-white">
            Week {log.week}
          </span>
          {log.date && (
            <span className="text-xs text-gray-500 font-medium tracking-wide">
              {log.date}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-4">
          {log.title}
        </h3>

        {/* Tags */}
        {log.tags && log.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {log.tags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="inline-flex items-center px-2 py-1 rounded text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10 tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rendered HTML Markdown Content */}
        <div
          className="text-gray-400 flex-1 [&_h2]:text-sm [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:font-semibold [&_h2]:text-gray-300 [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-sm md:[&_li]:text-base [&_p]:text-sm md:[&_p]:text-base [&_p]:leading-relaxed [&_p]:mt-3 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:mt-5 [&_strong]:text-gray-200 [&_img]:rounded-xl [&_img]:mt-5 [&_img]:border [&_img]:border-white/10 [&_img]:opacity-90 hover:[&_img]:opacity-100 [&_img]:transition-opacity"
          dangerouslySetInnerHTML={{ __html: log.htmlContent }}
        />
      </div>
    </motion.div>
  );
}

export default function Timeline({ logs = [] }) {
  if (!logs || logs.length === 0) return null;

  return (
    <section className="bg-black py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white"
          >
            Engineering Logs
          </motion.h2>
        </div>

        {/* Responsive CSS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {logs.map((log, index) => (
            <TimelineCard key={log.week ?? index} log={log} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
