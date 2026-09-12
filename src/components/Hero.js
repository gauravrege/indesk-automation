'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useCalmMotion from '@/lib/useCalmMotion';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Still colour behind the fold, painted as the section's OWN background
 * rather than as a child layer — one fewer full-viewport translucent
 * layer to composite under the fixed grain sheet.
 *
 * Still gradients only. A gradient that never moves is rasterised once;
 * animating a layer this size is what cost this site 50fps once before.
 */
const WASH = {
  backgroundImage:
    'radial-gradient(58rem 38rem at 8% 104%, rgba(255,74,28,0.14), transparent 62%),' +
    'radial-gradient(44rem 30rem at 96% -8%, rgba(255,138,92,0.07), transparent 60%)',
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useCalmMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // The hero sits still while the page scrolls over the top of it, easing
  // back a little as it goes. Transform and opacity only.
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.3]);

  return (
    <section
      id="top"
      ref={ref}
      style={WASH}
      className="sticky top-0 z-0 flex h-[100svh] flex-col justify-between overflow-hidden px-4 pt-7 pb-8 sm:px-8"
    >
      {/* ---------- Top rail ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
        className="flex items-center justify-between gap-4 border-b border-[var(--hair)] pb-5"
      >
        <p className="eyebrow">InDesk Automation</p>
        <p className="eyebrow hidden sm:block">Mumbai, IN</p>
        <p className="eyebrow flex items-center gap-2.5">
          <span className="pulse-dot" aria-hidden="true" />
          Internship Live
        </p>
      </motion.div>

      <motion.div style={{ scale, opacity: fade }} className="flex flex-1 flex-col justify-between origin-bottom">
        {/* ---------- The statement, decoding in ---------- */}
        <div className="pt-14 md:pt-20">
          <Decode
            text="Ten tools in ten weeks for a finance back office."
            as="p"
            delay={0.35}
            tick={30}
            charsPerTick={1.05}
            className="font-display block max-w-4xl text-[1.6rem] leading-[1.22] text-[var(--ink)] sm:text-[2.2rem] md:text-[3rem]"
          />

          {/* Three actual things that exist, with their real numbers — the
              detail is the point, not an adjective about the detail. */}
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: EASE }}
            className="mt-8 max-w-2xl space-y-3 text-[0.92rem] leading-[1.65] text-[var(--ink-3)] md:text-[0.98rem]"
          >
            {[
              'A Playwright bot that logs into the InDesk portal every day, exports two reports and writes them into Google Sheets unattended.',
              'An 817-line Apps Script behind a dashboard built on 9,090 rows of outstanding dues, across 14 regions and 4 zones.',
              'An .xlsx reader and writer with no dependencies at all — written on Node’s built-in zlib, because an .xlsx is a zip of XML.',
            ].map((line) => (
              <li key={line} className="relative pl-5">
                <span
                  className="absolute left-0 top-[0.72em] h-px w-2.5 bg-[var(--flare)]"
                  aria-hidden="true"
                />
                {line}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- The name, sitting on the baseline ---------- */}
        {/* One line, not two. "GAURAV REGE" set solid is about 7.4x its font
            size wide, so min() picks the largest size that still fits the
            viewport; wrapping to a second line costs ~240px of height and
            pushed the bottom rail out of a 900px-tall screen entirely. */}
        <h1 className="font-display-xl mt-10 whitespace-nowrap text-[min(12vw,11.5rem)] text-[var(--ink)]">
          <span className="block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
            <motion.span
              className="block"
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            >
              Gaurav Rege
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* ---------- Bottom rail ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        className="flex items-end justify-between gap-6 border-t border-[var(--hair)] pt-5"
      >
        <div className="flex items-center gap-5">
          <span className="scroll-cue block" aria-hidden="true" />
          <p className="eyebrow">Scroll</p>
        </div>

        <dl className="flex items-baseline gap-8 sm:gap-12">
          <div className="text-right">
            <dt className="eyebrow mb-2">Tools</dt>
            <dd className="font-display text-[1.4rem] tabular-nums text-[var(--ink)]">10</dd>
          </div>
          <div className="text-right">
            <dt className="eyebrow mb-2">Logged</dt>
            <dd className="font-display text-[1.4rem] tabular-nums text-[var(--ink)]">
              Jul&ndash;Sep 2026
            </dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}
