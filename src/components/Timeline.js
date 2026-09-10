'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function Timeline({ logs = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!logs || logs.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === logs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? logs.length - 1 : prev - 1));
  };

  const currentLog = logs[currentIndex];
  const progress = logs.length > 1 ? currentIndex / (logs.length - 1) : 1;

  return (
    <section id="gallery" className="overflow-hidden bg-[#f5f4f2] px-4 py-20 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ---------------- Project grid ---------------- */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400"
            >
              {logs.length} Projects &middot; Weeks 1&ndash;{logs[logs.length - 1]?.week}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: EASE }}
              className="mb-4 text-4xl font-medium tracking-tight text-[#1c1c1e] md:text-5xl"
            >
              Project Portfolio
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="mx-auto max-w-2xl text-lg text-gray-500"
            >
              Select a project to view its detailed weekly engineering log.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {logs.map((log, idx) => {
              const isActive = idx === currentIndex;
              return (
                <motion.div
                  key={`project-${idx}`}
                  initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.65, delay: (idx % 3) * 0.09, ease: EASE }}
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    setCurrentIndex(idx);
                    document
                      .getElementById('log-slider')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`shine-host group flex cursor-pointer flex-col justify-between rounded-3xl border bg-white p-8 transition-[border-color,box-shadow,background-color] duration-300 hover:shadow-xl ${
                    isActive
                      ? 'border-black/25 shadow-lg shadow-black/5'
                      : 'border-gray-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="mb-6 flex items-start justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                          isActive
                            ? 'bg-[#1c1c1e] text-white'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                        }`}
                      >
                        Week {log.week}
                      </span>
                      <span className="text-gray-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black">
                        &#8599;
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-medium leading-snug text-[#1c1c1e] group-hover:text-black">
                      {log.title}
                    </h3>
                  </div>

                  {log.tags && log.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {log.tags.slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ---------------- Log slider ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.8, ease: EASE }}
          id="log-slider"
          className="relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-[#dfdcd9] p-8 shadow-sm md:rounded-[3rem] md:p-16"
        >
          {/* Oversized ghost numeral, swaps with the slide */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`ghost-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.05, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="pointer-events-none absolute -right-4 -top-10 select-none text-[13rem] font-medium leading-none tracking-tighter text-black md:text-[20rem]"
              aria-hidden="true"
            >
              {String(currentLog.week).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>

          <div className="relative mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            {/* Left column */}
            <div className="col-span-1 flex flex-col justify-between lg:col-span-5">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div key={`meta-${currentIndex}`}>
                    <motion.h2
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="mb-4 text-4xl font-normal tracking-tight text-[#1c1c1e] md:text-5xl lg:text-6xl"
                    >
                      Week {currentLog.week}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                      className="mb-2 text-lg text-gray-600 md:text-xl"
                    >
                      {currentLog.title}
                    </motion.p>
                    {currentLog.date && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500"
                      >
                        {currentLog.date}
                      </motion.p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Tags for the active slide */}
                {currentLog.tags && currentLog.tags.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`tags-${currentIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                      className="mb-6 flex flex-wrap gap-2"
                    >
                      {currentLog.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full border border-black/10 bg-white/40 px-3 py-1 text-xs font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Project links */}
                <motion.div
                  key={`links-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
                  className="mt-2 flex flex-wrap gap-3"
                >
                  {currentLog.github && (
                    <a
                      href={currentLog.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-black hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      GitHub Repo
                    </a>
                  )}
                  {currentLog.demo && (
                    <a
                      href={currentLog.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-black hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Live Demo
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Desktop navigation */}
              <div className="mt-auto hidden items-center gap-4 pt-12 lg:flex">
                <button
                  onClick={prevSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black hover:text-white active:scale-95"
                >
                  <span className="sr-only">Previous</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black hover:text-white active:scale-95"
                >
                  <span className="sr-only">Next</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <span className="ml-2 text-sm tabular-nums text-gray-500">
                  {String(currentIndex + 1).padStart(2, '0')}
                  <span className="mx-1 text-gray-400">/</span>
                  {String(logs.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Right column: the log itself */}
            <div className="relative col-span-1 flex h-[50vh] max-h-[600px] min-h-[400px] flex-col lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="custom-scrollbar h-full overflow-y-auto pr-4 text-base leading-relaxed text-[#1c1c1e] md:text-lg"
                >
                  <div
                    className="[&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-medium [&_h2]:mb-4 [&_h2]:mt-8 first:[&_h2]:mt-0 [&_ul]:list-none [&_ul]:space-y-4 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:bg-black/70 [&_li]:before:rounded-full [&_p]:mb-5 [&_blockquote]:border-l-2 [&_blockquote]:border-black/30 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_img]:rounded-2xl [&_img]:mt-8 [&_img]:w-full [&_img]:shadow-sm [&_pre]:bg-[#e9e6e4] [&_pre]:p-5 md:[&_pre]:p-6 [&_pre]:rounded-2xl [&_pre]:overflow-x-auto [&_pre]:max-w-[calc(100vw-6rem)] md:[&_pre]:max-w-full [&_pre]:border [&_pre]:border-black/5 [&_pre]:shadow-inner [&_code]:text-sm [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: currentLog.htmlContent }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Fade the scroll area out at the bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#dfdcd9] to-transparent lg:h-12" />

              {/* Mobile navigation */}
              <div className="mt-12 flex gap-4 lg:hidden">
                <button onClick={prevSlide} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 transition-all hover:bg-black hover:text-white active:scale-95">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={nextSlide} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 transition-all hover:bg-black hover:text-white active:scale-95">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Progress rail */}
          <div className="relative mt-8 flex h-12 w-full items-center md:mt-16">
            <div className="absolute left-4 right-4 h-[1px] bg-black/10" />
            {/* Filled portion tracks the active slide */}
            <motion.div
              className="absolute left-4 right-4 h-[1.5px] origin-left bg-black/45"
              animate={{ scaleX: progress }}
              transition={{ duration: 0.55, ease: EASE }}
            />
            <div className="absolute left-0 right-0 flex justify-between px-4">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className="group relative flex h-6 w-6 cursor-pointer items-center justify-center"
                  onClick={() => setCurrentIndex(idx)}
                  title={`Week ${log.week} - ${log.title}`}
                >
                  <div
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'bg-black'
                        : idx < currentIndex
                        ? 'bg-black/40 group-hover:bg-black/70'
                        : 'bg-black/20 group-hover:bg-black/50'
                    }`}
                  />
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="activeRing"
                      className="absolute inset-0 rounded-full border-2 border-black"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
