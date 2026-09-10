'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const LINE_ONE = ['My', 'work', 'is'];
const LINE_TWO = ['rebuilding', 'systems'];

/* Words rise into place one after another, slightly overlapping. */
const word = {
  hidden: { y: '110%', opacity: 0 },
  show: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Background drifts slower than the page, foreground slightly faster.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[92vh] min-h-[620px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Photographic backdrop, parallaxed */}
      <motion.div
        style={{ y: reduce ? 0 : bgY }}
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/bg-moon.jpg)' }}
        />
      </motion.div>

      {/* Drifting colour — three soft blobs, heavily blurred */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-a absolute -top-[15%] -left-[10%] h-[55vw] w-[55vw] rounded-full bg-[#aebdd4] opacity-40 blur-[110px]" />
        <div className="aurora-b absolute top-[25%] -right-[15%] h-[50vw] w-[50vw] rounded-full bg-[#d9c9bb] opacity-45 blur-[120px]" />
        <div className="aurora-c absolute -bottom-[20%] left-[20%] h-[45vw] w-[45vw] rounded-full bg-[#c3cbd8] opacity-35 blur-[100px]" />
      </div>

      {/* Readability wash, and the hand-off into the page colour */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#e6e9f0]/50 via-transparent to-[#f5f4f2]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#f5f4f2] to-transparent" />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : fade }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-[-8vh]"
      >
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/55 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="soft-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-700">
            Automation Engineer Intern
          </span>
        </motion.div>

        {/* Heading — each word masked and lifted into place */}
        <h1 className="mb-7 text-5xl font-medium leading-[1.05] tracking-tight text-[#1c1c1e] sm:text-7xl md:text-8xl">
          <span className="block">
            {LINE_ONE.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={word}
                  initial="hidden"
                  animate="show"
                >
                  {w}
                </motion.span>
                {i < LINE_ONE.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
          <span className="block">
            {LINE_TWO.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block bg-gradient-to-br from-[#1c1c1e] via-[#4a5261] to-[#1c1c1e] bg-clip-text text-transparent"
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
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg"
        >
          Turning days of manual spreadsheet work into scripts that finish in seconds —
          and prove they got every row.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#gallery"
            className="group relative overflow-hidden rounded-full bg-[#1c1c1e] px-7 py-3.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.04] active:scale-100"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#2f3542] to-[#1c1c1e] transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <button
            onClick={() =>
              document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-full border border-black/10 bg-white/55 px-7 py-3.5 text-sm font-medium text-black backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-black/5"
          >
            See Impact
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
}
