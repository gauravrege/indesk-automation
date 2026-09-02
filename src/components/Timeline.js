'use client';

import { motion } from 'framer-motion';

export function TimelineCard({ log, index }) {
  // Alternate card styles to match the bento UI in the video
  const isDark = index % 3 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex-1 flex flex-col p-8 md:p-10 rounded-[2rem] shadow-sm transition-transform duration-500 hover:scale-[1.02] ${
        isDark 
          ? 'bg-[#111] text-white' 
          : 'bg-white border border-gray-100 text-[#1c1c1e]'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-16">
        <div>
          <h3 className={`text-2xl md:text-4xl font-normal tracking-tight mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            {log.title}
          </h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            Week {log.week} • {log.date}
          </p>
        </div>
        
        {/* Decorative Icon Circle */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <span className="text-xl">↗</span>
        </div>
      </div>

      {/* Tags */}
      {log.tags && log.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {log.tags.map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Rendered HTML Markdown Content */}
      <div
        className={`flex-1 ${
          isDark 
            ? '[&_h2]:text-white [&_p]:text-gray-400 [&_strong]:text-gray-200 [&_blockquote]:border-white/20' 
            : '[&_h2]:text-black [&_p]:text-gray-600 [&_strong]:text-gray-900 [&_blockquote]:border-black/10'
        } [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_ul]:list-none [&_ul]:space-y-3 [&_li]:relative [&_li]:pl-4 before:[&_li]:content-['•'] before:[&_li]:absolute before:[&_li]:left-0 before:[&_li]:text-gray-400 [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-6 [&_img]:rounded-2xl [&_img]:mt-6 [&_img]:w-full`}
        dangerouslySetInnerHTML={{ __html: log.htmlContent }}
      />
    </motion.div>
  );
}

export default function Timeline({ logs = [] }) {
  if (!logs || logs.length === 0) return null;

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#1c1c1e] mb-4">
            Making Progress Visible
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Turning invisible backend engineering and automation signals into meaningful UI elements and business value.
          </p>
        </div>

        {/* Responsive CSS Grid (Bento/Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {logs.map((log, index) => (
            <TimelineCard key={log.week ?? index} log={log} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
