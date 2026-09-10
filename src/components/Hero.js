'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1];
const LINE_ONE = ['My', 'work', 'is'];
const LINE_TWO = ['rebuilding', 'systems'];

/* Words rise out of a mask, slightly overlapping. Transform + opacity only. */
const word = {
  hidden: { y: '108%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.85, delay: 0.12 + i * 0.07, ease: EASE },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-[92vh] min-h-[620px] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Photographic backdrop — transform-only parallax */}
      <motion.div
        style={{ y: reduce ? 0 : bgY }}
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/bg-moon.jpg)' }}
        />
      </motion.div>

      {/* Colour wash — static gradients, painted once, zero per-frame cost */}
      <div className="atmosphere absolute inset-0 z-0" aria-hidden="true" />
      <div className="grid-substrate absolute inset-0 z-0 opacity-60" aria-hidden="true" />

      {/* Readability wash and the hand-off into the page colour */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eceef1]/55 via-transparent to-[var(--paper)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-52 bg-gradient-to-t from-[var(--paper)] to-transparent" />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : fade }}
        className="relative z-10 mx-auto mt-[-8vh] flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-white/70 px-4 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="soft-ping absolute inline-flex h-full w-full rounded-full bg-[var(--verified)]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--verified)]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-body)]">
            Automation Engineer Intern
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="mb-7 text-[3.1rem] font-medium leading-[1.02] tracking-[-0.03em] text-[var(--ink)] sm:text-7xl md:text-8xl">
          <span className="block">
            {LINE_ONE.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.09em] align-bottom">
                <motion.span className="inline-block" custom={i} variants={word} initial="hidden" animate="show">
                  {w}
                </motion.span>
                {i < LINE_ONE.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
          <span className="block">
            {LINE_TWO.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.09em] align-bottom">
                <motion.span
                  className={`inline-block ${i === 1 ? 'text-[var(--teal)]' : ''}`}
                  custom={LINE_ONE.length + i}
                  variants={word}
                  initial="hidden"
                  animate="show"
                >
                  {w}
                </motion.span>
                {i < LINE_TWO.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mb-9 max-w-xl text-base leading-relaxed text-[var(--ink-body)] md:text-lg"
        >
          Turning days of manual spreadsheet work into scripts that finish in seconds &mdash;
          and prove they got every row.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--teal)] px-7 py-3.5 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--teal-lift)] active:translate-y-0"
          >
            View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              &#8599;
            </span>
          </a>
          <button
            onClick={() =>
              document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-full border border-[var(--line-strong)] bg-white/70 px-7 py-3.5 text-sm font-medium text-[var(--ink)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            See Impact
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
