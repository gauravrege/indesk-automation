'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useRef, useEffect } from 'react';
import Magnetic from './Magnetic';

/* Long, flat easing. Nothing overshoots; nothing hurries. */
const EASE = [0.22, 1, 0.36, 1];

const LINE_ONE = ['My', 'work', 'is'];
const LINE_TWO = ['rebuilding', 'systems'];

const word = {
  hidden: { y: '112%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 1.5, delay: 0.25 + i * 0.11, ease: EASE },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-9%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Pointer parallax. The moon drifts against the cursor, the type drifts with
     it by a smaller amount — two planes, so the hero has depth rather than
     being a flat picture. Values are written outside React, never per render. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const soft = { stiffness: 42, damping: 22, mass: 0.9 };
  const moonX = useSpring(useTransform(px, [-0.5, 0.5], [26, -26]), soft);
  const moonY = useSpring(useTransform(py, [-0.5, 0.5], [18, -18]), soft);
  const typeX = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), soft);
  const typeY = useSpring(useTransform(py, [-0.5, 0.5], [-6, 6]), soft);

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [px, py, reduce]);

  return (
    /* The bottom padding reserves the strip the index overlaps into, so
       nothing here can ever collide with what follows. */
    <section
      ref={ref}
      className="relative flex h-[96vh] min-h-[620px] w-full flex-col items-center justify-center overflow-hidden pb-[clamp(6rem,14vh,10rem)]"
    >
      {/* The moon, held well back. It is texture, not a picture. */}
      <motion.div
        style={{ y: reduce ? 0 : bgY }}
        className="absolute inset-0 z-0 scale-110"
      >
        <motion.div
          style={{
            x: reduce ? 0 : moonX,
            y: reduce ? 0 : moonY,
            backgroundImage: 'url(/bg-moon.jpg)',
          }}
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.30]"
        />
        <div className="absolute inset-0 bg-[var(--void)]/45" />
      </motion.div>

      <div className="atmosphere absolute inset-0 z-0" aria-hidden="true" />
      <div className="grid-substrate absolute inset-0 z-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-t from-[var(--void)] via-[var(--void)]/80 to-transparent" />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : fade }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.div
          style={{ x: reduce ? 0 : typeX, y: reduce ? 0 : typeY }}
          className="w-full"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
            className="eyebrow mb-12"
          >
            Automation Engineer &nbsp;/&nbsp; Internship 2026
          </motion.p>

          <h1 className="font-display mb-12 leading-[0.94] text-[var(--bone)]">
            <span className="block text-[2.9rem] sm:text-[4.25rem] md:text-[5.5rem]">
              {LINE_ONE.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden pb-[0.09em] align-bottom">
                  <motion.span className="inline-block" custom={i} variants={word} initial="hidden" animate="show">
                    {w}
                  </motion.span>
                  {i < LINE_ONE.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </span>
            <span className="block text-[3.1rem] italic sm:text-[4.5rem] md:text-[6rem]">
              {LINE_TWO.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden pb-[0.11em] align-bottom">
                  <motion.span
                    className="inline-block"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.95, ease: EASE }}
            className="mx-auto mb-14 max-w-md text-[0.9rem] leading-[1.9] text-[var(--bone-3)]"
          >
            Days of manual spreadsheet work, reduced to scripts that finish in seconds
            &mdash; and prove they got every row.
          </motion.p>

          {/* Text links, not buttons. A button asks; a link simply is. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 1.15, ease: EASE }}
            className="flex items-center justify-center gap-10"
          >
            <Magnetic>
              <a
                href="#index"
                className="link-wipe text-[0.78rem] uppercase tracking-[0.22em] text-[var(--bone)] transition-colors duration-500 hover:text-[var(--sand)]"
              >
                The Work
              </a>
            </Magnetic>
            <span className="h-3 w-px bg-[var(--hair-2)]" aria-hidden="true" />
            <Magnetic>
              <button
                onClick={() =>
                  document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="link-wipe text-[0.78rem] uppercase tracking-[0.22em] text-[var(--bone-3)] transition-colors duration-500 hover:text-[var(--bone)]"
              >
                In Numbers
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* A hairline that fills downward, over and over. The only thing on the
          page that repeats — it reads as a pulse, not an animation. */}
      <motion.div
        style={{ opacity: reduce ? 1 : fade }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6, ease: EASE }}
          className="scroll-cue block h-14 w-px bg-[var(--hair-2)]"
        />
      </motion.div>
    </section>
  );
}
