'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1];
const LINE_ONE = ['My', 'work', 'is'];
const LINE_TWO = ['rebuilding', 'systems'];

const word = {
  hidden: { y: '108%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.12 + i * 0.07, ease: EASE },
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
    /* The bottom padding reserves the strip that the impact cards overhang
       into. Content is centred within what is left, so the buttons can never
       collide with the cards — which they did on short laptop screens when
       this was a plain centred box. */
    <section
      ref={ref}
      className="relative flex h-[94vh] min-h-[600px] w-full flex-col items-center justify-center overflow-hidden pb-[clamp(7rem,16vh,11rem)]"
    >
      <motion.div
        style={{ y: reduce ? 0 : bgY }}
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/bg-moon.jpg)' }}
        />
      </motion.div>

      <div className="atmosphere absolute inset-0 z-0" aria-hidden="true" />
      <div className="grid-substrate absolute inset-0 z-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eceef1]/55 via-transparent to-[var(--paper)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-[var(--paper)] to-transparent" />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : fade }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-white/70 px-4 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="soft-ping absolute inline-flex h-full w-full rounded-full bg-[var(--verified)]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--verified)]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-body)]">
            Automation Engineer Intern
          </span>
        </motion.div>

        {/* Sans statement, serif-italic payoff. The typeface switch is what
            keeps this from reading as a one-font template. */}
        <h1 className="mb-8 leading-[0.98] text-[var(--ink)]">
          <span className="block text-[2.6rem] font-medium tracking-[-0.035em] sm:text-6xl md:text-[4.5rem]">
            {LINE_ONE.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span className="inline-block" custom={i} variants={word} initial="hidden" animate="show">
                  {w}
                </motion.span>
                {i < LINE_ONE.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
          <span className="font-display mt-1 block text-[3.4rem] italic sm:text-[4.75rem] md:text-[6.25rem]">
            {LINE_TWO.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
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
          className="mb-9 max-w-lg text-[0.95rem] leading-relaxed text-[var(--ink-body)] md:text-base"
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
