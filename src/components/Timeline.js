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
    <section
      id="gallery"
      className="atmosphere-soft relative overflow-hidden bg-[var(--paper)] px-4 py-20 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">

        {/* ---------------- Project grid ---------------- */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]"
            >
              <span className="h-px w-6 bg-[var(--teal)]" aria-hidden="true" />
              {logs.length} Projects &middot; Weeks 1&ndash;{logs[logs.length - 1]?.week}
              <span className="h-px w-6 bg-[var(--teal)]" aria-hidden="true" />
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: EASE }}
              className="mb-4 text-4xl font-medium tracking-[-0.03em] text-[var(--ink)] md:text-5xl"
            >
              Project Portfolio
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="mx-auto max-w-2xl text-lg text-[var(--ink-soft)]"
            >
              Select a project to view its detailed weekly engineering log.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {logs.map((log, idx) => {
              const isActive = idx === currentIndex;
              return (
                <motion.button
                  type="button"
                  key={`project-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: EASE }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setCurrentIndex(idx);
                    document
                      .getElementById('log-slider')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`lift group flex cursor-pointer flex-col justify-between rounded-2xl border bg-[var(--card)] p-7 text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-[var(--teal)]'
                      : 'border-[var(--line)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="w-full">
                    <div className="mb-5 flex items-start justify-between">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-300 ${
                          isActive
                            ? 'bg-[var(--teal)] text-white'
                            : 'bg-[var(--paper-warm)] text-[var(--ink-soft)]'
                        }`}
                      >
                        Week {log.week}
                      </span>
                      <span
                        className={`transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isActive ? 'text-[var(--teal)]' : 'text-[var(--ink-mute)]'
                        }`}
                        aria-hidden="true"
                      >
                        &#8599;
                      </span>
                    </div>
                    <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-[var(--ink)]">
                      {log.title}
                    </h3>
                  </div>

                  {log.tags && log.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {log.tags.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-[var(--paper-warm)] px-2 py-0.5 text-[11px] font-medium text-[var(--ink-soft)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ---------------- Log slider ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.8, ease: EASE }}
          id="log-slider"
          className="relative scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--paper-deep)] p-7 sm:p-10 md:rounded-[2.5rem] md:p-14"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">

            {/* ---------- Left column ---------- */}
            <div className="col-span-1 flex flex-col lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${currentIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ochre)]">
                    Week {currentLog.week}
                  </p>
                  <h2 className="mb-3 text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
                    {currentLog.title}
                  </h2>
                  {currentLog.date && (
                    <p className="mb-5 font-mono text-xs tracking-wide text-[var(--ink-soft)]">
                      {currentLog.date}
                    </p>
                  )}

                  {currentLog.tags && currentLog.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {currentLog.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md border border-[var(--line)] bg-white/60 px-2.5 py-1 text-[11px] font-medium text-[var(--ink-body)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2.5">
                    {currentLog.github && (
                      <a
                        href={currentLog.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--teal)]"
                      >
                        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        GitHub Repo
                      </a>
                    )}
                    {currentLog.demo && (
                      <a
                        href={currentLog.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white"
                      >
                        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Oversized numeral fills the column's dead space. It sits in
                  normal flow inside its own box, so it can never collide with
                  the log text the way an absolutely-positioned one did. */}
              <div
                className="pointer-events-none relative mt-10 hidden h-28 select-none overflow-hidden lg:block"
                aria-hidden="true"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`ghost-${currentIndex}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute -left-1 top-0 font-medium leading-[0.78] tracking-[-0.05em] text-[7rem] text-[var(--ink)]/[0.07]"
                  >
                    {String(currentLog.week).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Desktop navigation */}
              <div className="mt-auto hidden items-center gap-3 pt-10 lg:flex">
                <button
                  onClick={prevSlide}
                  aria-label="Previous week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-[background-color,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--teal)] hover:bg-[var(--teal)] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-[background-color,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--teal)] hover:bg-[var(--teal)] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <span className="ml-2 font-mono text-xs tabular-nums text-[var(--ink-soft)]">
                  {String(currentIndex + 1).padStart(2, '0')}
                  <span className="mx-1 text-[var(--ink-soft)]">/</span>
                  {String(logs.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* ---------- Right column: the log ---------- */}
            <div className="relative col-span-1 flex h-[52vh] max-h-[560px] min-h-[380px] flex-col lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="custom-scrollbar h-full overflow-y-auto pr-4 text-[0.95rem] leading-relaxed text-[var(--ink-body)] md:text-base"
                >
                  <div
                    className="[&_h2]:text-lg md:[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-[var(--ink)] [&_h2]:mb-3 [&_h2]:mt-7 first:[&_h2]:mt-0 [&_ul]:list-none [&_ul]:space-y-3.5 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.62em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:bg-[var(--teal)] [&_li]:before:rounded-full [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-[var(--ink)] [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--ochre)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[var(--ink-body)] [&_blockquote]:my-6 [&_img]:rounded-xl [&_img]:mt-6 [&_img]:w-full [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:bg-white/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-white/70 [&_pre]:p-5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--line)] [&_pre]:my-5"
                    dangerouslySetInnerHTML={{ __html: currentLog.htmlContent }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--paper-deep)] to-transparent" />

              {/* Mobile navigation */}
              <div className="mt-8 flex items-center gap-3 lg:hidden">
                <button
                  onClick={prevSlide}
                  aria-label="Previous week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-colors hover:bg-[var(--teal)] hover:text-white active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-colors hover:bg-[var(--teal)] hover:text-white active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <span className="ml-1 font-mono text-xs tabular-nums text-[var(--ink-soft)]">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(logs.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- Progress rail ---------- */}
          <div className="relative mt-10 flex h-10 w-full items-center md:mt-14">
            <div className="absolute left-3 right-3 h-px bg-[var(--line-strong)]" />
            <motion.div
              className="absolute left-3 right-3 h-[2px] origin-left bg-[var(--teal)]"
              animate={{ scaleX: progress }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <div className="absolute inset-x-0 flex justify-between px-3">
              {logs.map((log, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Week ${log.week}: ${log.title}`}
                  aria-current={idx === currentIndex ? 'true' : undefined}
                  title={`Week ${log.week} - ${log.title}`}
                  className="group relative flex h-7 w-7 cursor-pointer items-center justify-center"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'bg-[var(--teal)]'
                        : idx < currentIndex
                        ? 'bg-[var(--teal)]/45 group-hover:bg-[var(--teal)]/80'
                        : 'bg-[var(--line-strong)] group-hover:bg-[var(--ink-mute)]'
                    }`}
                  />
                  {idx === currentIndex && (
                    <motion.span
                      layoutId="activeRing"
                      className="absolute inset-0 rounded-full border-2 border-[var(--teal)]"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
