'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCalmMotion from '@/lib/useCalmMotion';

const EASE = [0.22, 1, 0.36, 1];
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * One digit column. Ten numerals stacked in a strip inside a 1em window;
 * the strip slides up by exactly the digit's height.
 *
 * This is a transform on a tiny element — no counting loop, no text
 * rewriting, and it lands on the exact number rather than creeping
 * towards it the way a spring does.
 */
function Digit({ value, delay, reduce }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[1em] overflow-hidden align-bottom leading-[1em]"
    >
      <motion.span
        className="block"
        initial={reduce ? false : { y: '0%' }}
        whileInView={{ y: `-${value * 10}%` }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 1.5, delay, ease: EASE }}
        style={reduce ? { y: `-${value * 10}%` } : undefined}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] leading-[1em]">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * A number that rolls into place, digit by digit, like a mechanical
 * counter. Separators and any suffix are rendered as plain glyphs —
 * only the numerals move.
 */
export default function Odometer({ value, suffix = '', className = '' }) {
  const ref = useRef(null);
  const reduce = useCalmMotion();
  useInView(ref, { once: true });

  const formatted = value.toLocaleString('en-US');

  // Each digit column physically contains all ten numerals, so the visible
  // number is a matter of which one the transform happens to be showing.
  // Read as text that is "01234567890123456789…" — which is what a screen
  // reader, and a search engine, would get. The real value goes on the
  // label and the moving parts are hidden from both.
  return (
    <span
      ref={ref}
      aria-label={`${formatted}${suffix}`}
      className={`inline-flex items-end tabular-nums ${className}`}
    >
      {Array.from(formatted).map((ch, i) =>
        /\d/.test(ch) ? (
          <Digit
            key={i}
            value={Number(ch)}
            delay={i * 0.075}
            reduce={reduce}
          />
        ) : (
          <span key={i} aria-hidden="true" className="inline-block leading-[1em]">
            {ch}
          </span>
        )
      )}
      {suffix && (
        /* Normal tracking and a lighter weight. The suffix otherwise
           inherits the display face's -0.055em letter-spacing, which is
           fine for one glyph like "+" but sets a word like "min" solid. */
        <span
          aria-hidden="true"
          className="ml-[0.1em] self-start text-[0.32em] font-bold leading-none tracking-[0.02em] text-[var(--flare)]"
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
