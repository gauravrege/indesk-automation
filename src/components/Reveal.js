'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Reveals a line of text one character at a time, each sliding up out of its
 * own clipping box. Characters translate only — no filter, no layout work —
 * so a long heading costs nothing to animate.
 *
 * `as` lets a heading stay a heading; the full string is exposed to screen
 * readers once via aria-label and the pieces are hidden from them.
 */
export default function Reveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.028,
  duration = 1.1,
}) {
  const MotionTag = motion[Tag] ?? motion.span;
  const chars = Array.from(text);

  return (
    <MotionTag
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      className={className}
    >
      {chars.map((c, i) => (
        <span
          key={`${c}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em' }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: {
                y: '0%',
                transition: { duration, delay: delay + i * stagger, ease: EASE },
              },
            }}
          >
            {c === ' ' ? '\u00A0' : c}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
