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
      className="atmosphere-soft relative overflow-hidden bg-[var(--paper)] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">

        {/* ---------------- Project grid ---------------- */}
        <div className="mb-20 md:mb-24">
          <div className="mb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--teal)]"
            >
              <span className="h-px w-7 bg-[var(--teal)]/45" aria-hidden="true" />
              {logs.length} Projects &middot; Weeks 1&ndash;{logs[logs.length - 1]?.week}
              <span className="h-px w-7 bg-[var(--teal)]/45" aria-hidden="true" />
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: EASE }}
              className="font-display mb-4 text-[2.75rem] leading-[1.05] text-[var(--ink)] md:text-6xl"
            >
              Project <span className="italic text-[var(--teal)]">Portfolio</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="mx-auto max-w-xl text-[0.95rem] text-[var(--ink-soft)] md:text-base"
            >
              Select a project to view its detailed weekly engineering log.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  className={`lift group flex cursor-pointer flex-col justify-between rounded-2xl border p-7 text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-[var(--teal)]/45 bg-[var(--teal)]/[0.045]'
                      : 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="w-full">
                    <div className="mb-6 flex items-baseline justify-between gap-3">
                      <span
                        className={`font-mono text-[11px] tracking-[0.12em] transition-colors duration-300 ${
                          isActive ? 'text-[var(--teal)]' : 'text-[var(--ink-mute)]'
                        }`}
                      >
                        WK {String(log.week).padStart(2, '0')}
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
                    <h3 className="font-display text-[1.6rem] leading-[1.12] text-[var(--ink)]">
                      {log.title}
                    </h3>
                  </div>

                  {log.tags && log.tags.length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-1.5">
                      {log.tags.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md border border-[var(--line)] px-2 py-0.5 text-[11px] font-medium text-[var(--ink-soft)]"
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

        {/* ---------------- Log slider (dark) ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.8, ease: EASE }}
          id="log-slider"
          className="on-dark relative scroll-mt-24 overflow-hidden rounded-[1.5rem] bg-[var(--obsidian)] p-7 shadow-[0_40px_90px_-40px_rgba(21,21,26,0.55)] sm:p-10 md:rounded-[2rem] md:p-14"
        >
          <div className="atmosphere-dark pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="grid-substrate-dark pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">

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
                  <p className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-[var(--gold)]">
                    WEEK {String(currentLog.week).padStart(2, '0')}
                    <span className="h-px w-8 bg-[var(--gold)]/40" aria-hidden="true" />
                  </p>
                  <h2 className="font-display mb-4 text-[2.1rem] leading-[1.06] text-[var(--cream)] md:text-[2.6rem] lg:text-[3rem]">
                    {currentLog.title}
                  </h2>
                  {currentLog.date && (
                    <p className="mb-6 font-mono text-xs tracking-wide text-[var(--cream-soft)]">
                      {currentLog.date}
                    </p>
                  )}

                  {currentLog.tags && currentLog.tags.length > 0 && (
                    <div className="mb-7 flex flex-wrap gap-1.5">
                      {currentLog.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md border border-[var(--line-dark)] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[var(--cream-body)]"
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
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--obsidian)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#e2c288]"
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
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--line-dark-s)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
                      >
                        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Oversized numeral sits in normal flow inside its own fixed box,
                  so it cannot collide with the log text beside it. */}
              <div
                className="pointer-events-none relative mt-10 hidden h-24 select-none overflow-hidden lg:block"
                aria-hidden="true"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`ghost-${currentIndex}`}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -22 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="font-display absolute -left-1 top-0 text-[6.5rem] leading-[0.8] text-white/[0.07]"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-dark-s)] text-[var(--cream)] transition-[background-color,transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-dark-s)] text-[var(--cream)] transition-[background-color,transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <span className="ml-2 font-mono text-xs tabular-nums text-[var(--cream-soft)]">
                  {String(currentIndex + 1).padStart(2, '0')}
                  <span className="mx-1 text-[var(--cream-soft)]/60">/</span>
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
                  className="custom-scrollbar h-full overflow-y-auto pr-4 text-[0.95rem] leading-[1.75] text-[var(--cream-body)] md:text-base"
                >
                  <div
                    className="[&_h2]:font-display [&_h2]:text-[1.5rem] md:[&_h2]:text-[1.75rem] [&_h2]:leading-tight [&_h2]:text-[var(--cream)] [&_h2]:mb-4 [&_h2]:mt-9 first:[&_h2]:mt-0 [&_ul]:list-none [&_ul]:space-y-4 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:bg-[var(--gold)] [&_li]:before:rounded-full [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-[var(--cream)] [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--gold)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[var(--cream)] [&_blockquote]:my-7 [&_img]:rounded-xl [&_img]:mt-6 [&_img]:w-full [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:bg-white/[0.07] [&_code]:text-[var(--teal-bright)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-[var(--obsidian-card)] [&_pre]:p-5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--line-dark)] [&_pre]:my-5"
                    dangerouslySetInnerHTML={{ __html: currentLog.htmlContent }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--obsidian)] to-transparent" />

              {/* Mobile navigation */}
              <div className="mt-8 flex items-center gap-3 lg:hidden">
                <button
                  onClick={prevSlide}
                  aria-label="Previous week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-dark-s)] text-[var(--cream)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--obsidian)] active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next week"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-dark-s)] text-[var(--cream)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--obsidian)] active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <span className="ml-1 font-mono text-xs tabular-nums text-[var(--cream-soft)]">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(logs.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- Progress rail ---------- */}
          <div className="relative mt-10 flex h-10 w-full items-center md:mt-14">
            <div className="absolute left-3 right-3 h-px bg-[var(--line-dark-s)]" />
            <motion.div
              className="absolute left-3 right-3 h-[2px] origin-left bg-[var(--gold)]"
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
                        ? 'bg-[var(--gold)]'
                        : idx < currentIndex
                        ? 'bg-[var(--gold)]/50 group-hover:bg-[var(--gold)]/85'
                        : 'bg-white/25 group-hover:bg-white/55'
                    }`}
                  />
                  {idx === currentIndex && (
                    <motion.span
                      layoutId="activeRing"
                      className="absolute inset-0 rounded-full border-2 border-[var(--gold)]"
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
