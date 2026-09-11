'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function Timeline({ logs = [] }) {
  const [activeTags, setActiveTags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* Every tag that actually appears in the logs, most-used first. Derived
     from the markdown frontmatter, so it can never drift from the content. */
  const allTags = useMemo(() => {
    const counts = new Map();
    logs.forEach((l) => (l.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [logs]);

  /* OR semantics: with this many tags, requiring all of them empties the list
     almost immediately. Matching any keeps filtering useful for browsing. */
  const filtered = useMemo(() => {
    if (activeTags.length === 0) return logs;
    return logs.filter((l) => (l.tags || []).some((t) => activeTags.includes(t)));
  }, [logs, activeTags]);

  // Index addresses the filtered set, so narrowing must not strand it.
  useEffect(() => {
    setCurrentIndex((i) => (i < filtered.length ? i : 0));
  }, [filtered.length]);

  const currentLog = filtered[currentIndex] || filtered[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
  }, [filtered.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  }, [filtered.length]);

  const toggleTag = (tag) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const openLog = (idx) => {
    setCurrentIndex(idx);
    document.getElementById('log')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  /* Deep link: /#w09 opens that week directly, and the address bar tracks the
     open entry so a single project can be shared. replaceState, so this never
     adds history entries or fights the smooth scroll. */
  useEffect(() => {
    const applyHash = () => {
      const m = /^#w(\d+)$/.exec(window.location.hash);
      if (!m) return;
      const want = logs.findIndex((l) => String(l.week) === String(Number(m[1])));
      if (want === -1) return;
      setActiveTags([]);          // a shared link must not land on a filtered-out entry
      setCurrentIndex(want);
      requestAnimationFrame(() =>
        document.getElementById('log')?.scrollIntoView({ block: 'center' })
      );
    };
    applyHash();
    // Also honour the hash changing on an already-open page — pasting a link
    // into the address bar does not remount the component.
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [logs]);

  useEffect(() => {
    if (!currentLog) return;
    const hash = `#w${String(currentLog.week).padStart(2, '0')}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [currentLog]);

  /* Arrow keys move between entries, but never while someone is typing. */
  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextSlide, prevSlide]);

  if (!logs.length) return null;

  const progress = filtered.length > 1 ? currentIndex / (filtered.length - 1) : 1;

  return (
    <section id="index" className="atmosphere-faint relative px-5 py-24 sm:px-8 md:py-32">
      <div className="relative mx-auto max-w-6xl">

        {/* ---------------- Index ---------------- */}
        <div className="mb-28 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="mb-10 flex items-baseline justify-between gap-6 border-b border-[var(--hair)] pb-6"
          >
            <h2 className="font-display text-[2.4rem] leading-none text-[var(--bone)] md:text-[3.25rem]">
              Index
            </h2>
            <p className="eyebrow shrink-0 tabular-nums">
              {String(filtered.length).padStart(2, '0')}
              {activeTags.length > 0 && <span> / {String(logs.length).padStart(2, '0')}</span>}
              {' '}Projects
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="mb-12 flex flex-wrap items-center gap-x-5 gap-y-2.5"
          >
            <span className="eyebrow mr-1">Filter</span>
            {allTags.map(([tag, count]) => {
              const on = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={on}
                  className={`text-[0.74rem] tracking-[0.06em] transition-colors duration-500 ${
                    on
                      ? 'text-[var(--sand)]'
                      : 'text-[var(--bone-4)] hover:text-[var(--bone-2)]'
                  }`}
                >
                  {tag}
                  <span className="ml-1.5 font-mono text-[9px] align-super opacity-60">
                    {count}
                  </span>
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="link-wipe ml-1 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--bone-3)] transition-colors duration-500 hover:text-[var(--bone)]"
              >
                Clear
              </button>
            )}
          </motion.div>

          <ul>
            <AnimatePresence initial={false}>
              {filtered.map((log, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <motion.li
                    key={`row-${log.week}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => openLog(idx)}
                      aria-current={isActive ? 'true' : undefined}
                      className="group grid w-full grid-cols-[2.6rem_1fr] items-baseline gap-x-4 border-b border-[var(--hair)] py-6 text-left transition-colors duration-700 hover:bg-white/[0.018] md:grid-cols-[3.5rem_1fr_auto] md:gap-x-8 md:py-7"
                    >
                      <span
                        className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-700 ${
                          isActive ? 'text-[var(--sand)]' : 'text-[var(--bone-4)] group-hover:text-[var(--bone-3)]'
                        }`}
                      >
                        {String(log.week).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`font-display block text-[1.5rem] leading-[1.15] transition-colors duration-700 md:text-[2rem] ${
                            isActive ? 'text-[var(--sand)]' : 'text-[var(--bone)]'
                          }`}
                        >
                          {log.title}
                        </span>
                        {log.tags && log.tags.length > 0 && (
                          <span className="mt-2 block text-[0.72rem] tracking-[0.08em] text-[var(--bone-4)] md:hidden">
                            {log.tags.slice(0, 2).join(' · ')}
                          </span>
                        )}
                      </span>

                      <span className="hidden items-baseline gap-7 md:flex">
                        {log.tags && log.tags.length > 0 && (
                          <span className="text-[0.72rem] tracking-[0.08em]">
                            {log.tags.slice(0, 2).map((t, i) => (
                              <span
                                key={t}
                                className={
                                  activeTags.includes(t) ? 'text-[var(--sand)]' : 'text-[var(--bone-4)]'
                                }
                              >
                                {i > 0 && <span className="text-[var(--bone-4)]"> &middot; </span>}
                                {t}
                              </span>
                            ))}
                          </span>
                        )}
                        <span
                          className={`block w-4 transition-all duration-700 group-hover:translate-x-1 ${
                            isActive ? 'text-[var(--sand)]' : 'text-[var(--bone-4)]'
                          }`}
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M1 8h13M9 3l5 5-5 5" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {filtered.length === 0 && (
            <p className="py-14 text-center text-[0.9rem] text-[var(--bone-3)]">
              Nothing matches those filters.
            </p>
          )}
        </div>

        {/* ---------------- The log ---------------- */}
        {currentLog && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -90px 0px' }}
            transition={{ duration: 1.2, ease: EASE }}
            id="log"
            className="relative scroll-mt-24 border border-[var(--hair)] bg-[var(--surface)] px-6 py-10 sm:px-10 md:px-14 md:py-14"
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

              {/* ---------- Left ---------- */}
              <div className="col-span-1 flex flex-col lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`meta-${currentLog.week}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <p className="eyebrow mb-6 flex items-center gap-4">
                      Week {String(currentLog.week).padStart(2, '0')}
                      <span className="h-px w-10 bg-[var(--hair-2)]" aria-hidden="true" />
                    </p>

                    <h2 className="font-display mb-5 text-[2rem] leading-[1.08] text-[var(--bone)] md:text-[2.5rem] lg:text-[2.9rem]">
                      {currentLog.title}
                    </h2>

                    {currentLog.date && (
                      <p className="mb-8 font-mono text-[11px] tracking-[0.14em] text-[var(--bone-4)]">
                        {currentLog.date}
                      </p>
                    )}

                    {currentLog.tags && currentLog.tags.length > 0 && (
                      <ul className="mb-9 space-y-1.5">
                        {currentLog.tags.map((tag) => (
                          <li key={tag}>
                            <button
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`text-left text-[0.78rem] tracking-[0.05em] transition-colors duration-500 hover:text-[var(--sand)] ${
                                activeTags.includes(tag) ? 'text-[var(--sand)]' : 'text-[var(--bone-3)]'
                              }`}
                            >
                              {tag}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                      {currentLog.github && (
                        <a
                          href={currentLog.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-wipe text-[0.74rem] uppercase tracking-[0.22em] text-[var(--bone)] transition-colors duration-500 hover:text-[var(--sand)]"
                        >
                          Repository
                        </a>
                      )}
                      {currentLog.demo && (
                        <a
                          href={currentLog.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-wipe text-[0.74rem] uppercase tracking-[0.22em] text-[var(--bone)] transition-colors duration-500 hover:text-[var(--sand)]"
                        >
                          Live Site
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div
                  className="pointer-events-none relative mt-14 hidden h-24 select-none overflow-hidden lg:block"
                  aria-hidden="true"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`ghost-${currentLog.week}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.8, ease: EASE }}
                      className="font-display absolute -left-1 top-0 text-[6.5rem] leading-[0.8] text-[var(--bone)]/[0.055]"
                    >
                      {String(currentLog.week).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="mt-auto hidden items-center gap-8 pt-12 lg:flex">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={prevSlide}
                      aria-label="Previous week"
                      className="w-5 text-[var(--bone-3)] transition-all duration-500 hover:-translate-x-0.5 hover:text-[var(--sand)]"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 8H2M7 3L2 8l5 5" /></svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Next week"
                      className="w-5 text-[var(--bone-3)] transition-all duration-500 hover:translate-x-0.5 hover:text-[var(--sand)]"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
                    </button>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums tracking-[0.16em] text-[var(--bone-4)]">
                    {String(currentIndex + 1).padStart(2, '0')} &mdash; {String(filtered.length).padStart(2, '0')}
                  </span>
                  <span className="hidden font-mono text-[10px] tracking-[0.16em] text-[var(--bone-4)] xl:inline">
                    &larr; &rarr; to move
                  </span>
                </div>
              </div>

              {/* ---------- Right: the prose ---------- */}
              <div className="relative col-span-1 flex h-[54vh] max-h-[580px] min-h-[400px] flex-col lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${currentLog.week}`}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="custom-scrollbar h-full overflow-y-auto pr-6 text-[0.92rem] leading-[1.95] text-[var(--bone-2)]"
                  >
                    <div
                      className="[&_h2]:font-mono [&_h2]:text-[10px] [&_h2]:leading-none [&_h2]:tracking-[0.3em] [&_h2]:uppercase [&_h2]:text-[var(--sand-dim)] [&_h2]:font-normal [&_h2]:pb-4 [&_h2]:border-b [&_h2]:border-[var(--hair)] [&_h2]:mb-7 [&_h2]:mt-14 first:[&_h2]:mt-0 [&_ul]:list-none [&_ul]:space-y-5 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:w-2.5 [&_li]:before:h-px [&_li]:before:bg-[var(--sand-dim)] [&_p]:mb-5 [&_strong]:font-normal [&_strong]:text-[var(--bone)] [&_blockquote]:border-l [&_blockquote]:border-[var(--sand-dim)] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-[var(--bone)] [&_blockquote]:my-9 [&_blockquote]:font-display [&_blockquote]:text-[1.15rem] [&_blockquote]:leading-[1.7] [&_img]:mt-8 [&_img]:w-full [&_code]:font-mono [&_code]:text-[0.82em] [&_code]:text-[var(--sand)] [&_code]:bg-white/[0.05] [&_code]:px-1.5 [&_code]:py-0.5 [&_pre]:bg-[var(--surface-3)] [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--hair)] [&_pre]:my-6"
                      dangerouslySetInnerHTML={{ __html: currentLog.htmlContent }}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--surface)] to-transparent" />

                <div className="mt-8 flex items-center gap-8 lg:hidden">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={prevSlide}
                      aria-label="Previous week"
                      className="w-5 text-[var(--bone-3)] transition-colors hover:text-[var(--sand)]"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 8H2M7 3L2 8l5 5" /></svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Next week"
                      className="w-5 text-[var(--bone-3)] transition-colors hover:text-[var(--sand)]"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
                    </button>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums tracking-[0.16em] text-[var(--bone-4)]">
                    {String(currentIndex + 1).padStart(2, '0')} &mdash; {String(filtered.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* ---------- Progress rail ---------- */}
            <div className="relative mt-14 flex h-6 w-full items-center">
              <div className="absolute inset-x-0 h-px bg-[var(--hair)]" />
              <motion.div
                className="absolute inset-x-0 h-px origin-left bg-[var(--sand)]"
                animate={{ scaleX: progress }}
                transition={{ duration: 0.9, ease: EASE }}
              />
              <div className="absolute inset-x-0 flex justify-between">
                {filtered.map((log, idx) => (
                  <button
                    type="button"
                    key={log.week}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Week ${log.week}: ${log.title}`}
                    aria-current={idx === currentIndex ? 'true' : undefined}
                    title={`${String(log.week).padStart(2, '0')} — ${log.title}`}
                    className="group relative flex h-6 w-6 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={`h-px transition-all duration-700 ${
                        idx === currentIndex
                          ? 'w-4 bg-[var(--sand)]'
                          : 'w-2 bg-[var(--hair-3)] group-hover:w-3 group-hover:bg-[var(--bone-3)]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
