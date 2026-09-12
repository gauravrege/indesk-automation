'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useCalmMotion from '@/lib/useCalmMotion';
import Decode from './Decode';
import Reader from './Reader';

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 7000;

/** Writes the pointer position into CSS vars so `.spotlight` can follow it.
    Deliberately not React state — a mouse move must never cause a render. */
function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function Slide({ log, total, active, onOpen }) {
  return (
    <div
      className="w-full shrink-0 px-1"
      aria-hidden={active ? undefined : 'true'}
      /* Off-screen slides are taken out of the tab order, otherwise you can
         tab into a slide you cannot see and the track jumps to it.
         `inert` must be a real boolean here — passing the empty string
         renders nothing at all and silently does no work. */
      inert={active ? undefined : true}
    >
      <article
        onMouseMove={trackSpotlight}
        className="spotlight group relative flex min-h-[27rem] flex-col border border-[var(--hair)] bg-[var(--surface)] px-6 py-8 sm:px-10 sm:py-11 md:px-14 md:py-13"
      >
        <span
          className="font-display-xl pointer-events-none absolute right-6 top-2 select-none text-[6rem] leading-none text-[var(--ink)]/[0.04] sm:text-[8rem] md:right-10 md:text-[11rem]"
          aria-hidden="true"
        >
          {String(log.week).padStart(2, '0')}
        </span>

        <header className="relative flex items-center justify-between gap-4 border-b border-[var(--hair)] pb-5">
          <p className="eyebrow">
            Week {String(log.week).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          {log.date && (
            <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--ink-4)]">
              {log.date}
            </p>
          )}
        </header>

        <h3 className="font-display relative mt-8 max-w-3xl text-[1.8rem] leading-[1.04] text-[var(--ink)] sm:text-[2.4rem] md:text-[3rem]">
          {log.title}
        </h3>

        {log.excerpt && (
          <p className="relative mt-6 max-w-2xl text-[0.95rem] leading-[1.8] text-[var(--ink-3)] md:text-[1.02rem]">
            {log.excerpt}
          </p>
        )}

        <div className="relative mt-auto pt-9">
          {log.tags?.length > 0 && (
            <ul className="mb-7 flex flex-wrap gap-2">
              {log.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-[var(--hair)] px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[var(--ink-4)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-[var(--hair)] pt-6">
            <button
              type="button"
              onClick={onOpen}
              tabIndex={active ? 0 : -1}
              className="link-wipe text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink)] transition-colors duration-500 hover:text-[var(--flare)]"
            >
              Read the log
            </button>
            {log.github && (
              <a
                href={log.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={active ? 0 : -1}
                className="link-wipe text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink-3)] transition-colors duration-500 hover:text-[var(--flare)]"
              >
                Repository
              </a>
            )}
            {log.demo && (
              <a
                href={log.demo}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={active ? 0 : -1}
                className="link-wipe text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink-3)] transition-colors duration-500 hover:text-[var(--flare)]"
              >
                Live
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Slider({ logs = [] }) {
  const calm = useCalmMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);

  const count = logs.length;

  const go = useCallback(
    (n) => setIndex(((n % count) + count) % count),
    [count]
  );
  const step = useCallback((d) => go(index + d), [go, index]);

  // Auto-advance. Held while the pointer is over the slider, while a slide
  // is being dragged, while the reader is open, and entirely off for anyone
  // who has asked for reduced motion.
  const held = paused || open !== null || calm;
  useEffect(() => {
    if (held || count < 2) return;
    const id = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, held, count, go]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  };

  if (count === 0) return null;

  return (
    <section id="work" className="relative px-4 py-24 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-[var(--hair)] pb-6">
          <div>
            <p className="eyebrow mb-5">Weeks 01&ndash;10, July to September 2026</p>
            <Decode
              text="The build log"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">Drag, or use &larr; &rarr;</p>
        </div>

        {/* ---------------- the track ---------------- */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Weekly project log"
        >
          <motion.div
            className="flex"
            /* One transform on one element moves every slide — the slides
               themselves never animate individually. */
            animate={{ x: `-${index * 100}%` }}
            transition={
              calm
                ? { duration: 0 }
                : { type: 'spring', stiffness: 260, damping: 34, mass: 0.9 }
            }
            drag={calm ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragStart={() => { dragging.current = true; setPaused(true); }}
            onDragEnd={(_, info) => {
              dragging.current = false;
              setPaused(false);
              const throwDistance = info.offset.x + info.velocity.x * 0.12;
              if (throwDistance < -90) step(1);
              else if (throwDistance > 90) step(-1);
            }}
          >
            {logs.map((log, i) => (
              <Slide
                key={log.week}
                log={log}
                total={count}
                active={i === index}
                onOpen={() => setOpen(i)}
              />
            ))}
          </motion.div>
        </div>

        {/* ---------------- controls ---------------- */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous week"
              className="flex h-11 w-11 items-center justify-center border border-[var(--hair-2)] text-[var(--ink-3)] transition-all duration-500 hover:-translate-x-0.5 hover:border-[var(--flare)] hover:text-[var(--flare)]"
            >
              <svg viewBox="0 0 16 16" className="w-4" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M15 8H2M7 3L2 8l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next week"
              className="flex h-11 w-11 items-center justify-center border border-[var(--hair-2)] text-[var(--ink-3)] transition-all duration-500 hover:translate-x-0.5 hover:border-[var(--flare)] hover:text-[var(--flare)]"
            >
              <svg viewBox="0 0 16 16" className="w-4" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M1 8h13M9 3l5 5-5 5" />
              </svg>
            </button>

            {/* No "02 / 10" position counter here. Sitting beside a slide
                headed "Week 09" it read as a contradiction; the highlighted
                chip in the week list is the position indicator. */}
            <span className="ml-2 font-mono text-[11px] tracking-[0.18em] text-[var(--ink-4)]">
              Week {String(logs[index].week).padStart(2, '0')}
            </span>
          </div>

          {/* Week numbers, doubling as the position indicator. */}
          <ol className="flex flex-wrap items-center gap-1.5">
            {logs.map((log, i) => (
              <li key={log.week}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Week ${log.week}: ${log.title}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`h-8 w-8 font-mono text-[10px] tabular-nums transition-colors duration-400 ${
                    i === index
                      ? 'bg-[var(--flare)] text-[var(--void)]'
                      : 'text-[var(--ink-4)] hover:bg-white/[0.06] hover:text-[var(--ink-2)]'
                  }`}
                >
                  {String(log.week).padStart(2, '0')}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* The bar refills on every slide, so it doubles as a countdown to
            the next one. Keyed on index so it restarts cleanly. */}
        <div className="relative mt-7 h-px w-full bg-[var(--hair)]">
          {!calm && (
            <motion.div
              key={`${index}-${held}`}
              className="absolute inset-y-0 left-0 origin-left bg-[var(--flare)]"
              style={{ width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: held ? 0 : 1 }}
              transition={{ duration: held ? 0.3 : AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          )}
        </div>
      </div>

      <Reader
        logs={logs}
        open={open}
        onClose={() => setOpen(null)}
        onStep={(d) => setOpen((i) => (i === null ? null : (i + d + count) % count))}
      />
    </section>
  );
}
