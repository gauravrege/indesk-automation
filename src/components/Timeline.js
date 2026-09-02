'use client';

import { motion } from 'framer-motion';

export function TimelineCard({ log, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="flex flex-col h-full"
    >
      <div className="group flex-1 flex flex-col relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header: Week badge & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm">
            Week {log.week}
          </span>
          {log.date && (
            <span className="text-xs md:text-sm text-gray-400 font-medium">
              {log.date}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-purple-300 transition-colors duration-300">
          {log.title}
        </h3>

        {/* Tags */}
        {log.tags && log.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {log.tags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300 border border-white/10 group-hover:border-purple-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rendered HTML Markdown Content */}
        <div
          className="text-gray-300 flex-1 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-400 [&_li]:text-sm md:[&_li]:text-base [&_p]:text-gray-400 [&_p]:text-sm md:[&_p]:text-base [&_p]:leading-relaxed [&_p]:mt-3 [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-purple-200 [&_blockquote]:bg-purple-500/5 [&_blockquote]:py-2 [&_blockquote]:rounded-r-lg [&_blockquote]:mt-4 [&_strong]:text-gray-200 [&_img]:rounded-xl [&_img]:mt-4 [&_img]:border [&_img]:border-white/10"
          dangerouslySetInnerHTML={{ __html: log.htmlContent }}
        />
      </div>
    </motion.div>
  );
}

export default function Timeline({ logs = [] }) {
  if (!logs || logs.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Project <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
              A comprehensive breakdown of architectural milestones, automation pipelines, and delivered features.
            </p>
          </motion.div>
        </div>

        {/* Responsive CSS Grid (Bento/Card Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {logs.map((log, index) => (
            <TimelineCard key={log.week ?? index} log={log} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
