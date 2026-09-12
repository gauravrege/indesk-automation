'use client';

import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

/* A still wash rising off the bottom edge, painted as the footer's own
   background instead of a child layer — one fewer layer to composite,
   same picture. See the note in Hero.js. */
const WASH = {
  backgroundImage:
    'radial-gradient(44rem 24rem at 18% 116%, rgba(255,74,28,0.16), transparent 64%)',
};

const links = [
  { label: 'GitHub', href: 'https://github.com/gauravrege' },
  // LinkedIn intentionally omitted until the real profile URL is known —
  // a dead link reads worse than no link at all.
];

/**
 * `repoCount` and `total` are counted from the logs at build time rather
 * than typed in, so the sentence below cannot drift out of date the next
 * time a week is added with or without a repository link.
 */
export default function Footer({ repoCount = 0, total = 0 }) {
  return (
    <footer style={WASH} className="relative overflow-hidden px-4 pb-12 pt-20 sm:px-8 md:pt-24">
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="eyebrow mb-8 flex items-center gap-2.5"
        >
          <span className="pulse-dot" aria-hidden="true" />
          Internship in progress
        </motion.p>

        <Decode
          text="Ten weeks of work, logged week by week."
          as="h2"
          tick={30}
          charsPerTick={1.1}
          className="font-display block max-w-4xl text-[2rem] leading-[1.06] text-[var(--ink)] sm:text-[3rem] md:text-[4.2rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="mt-9 max-w-2xl text-[0.95rem] leading-[1.8] text-[var(--ink-3)] md:text-[1.02rem]"
        >
          Automation engineer intern, Mumbai. Node, Python and Playwright pointed at
          Excel, Google Sheets and PDFs &mdash; mostly taking steps out of finance
          workflows that were being done by hand.{' '}
          {repoCount > 0 && (
            <>
              {repoCount} of the {total} weeks link to a public repository; the rest
              were Google Sheets and Apps Script work that lives in the company&rsquo;s
              own files.
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-[var(--hair)] pt-8"
        >
          {links.map((link) => (
            <Magnetic key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="chip inline-flex items-center gap-3 border border-[var(--hair-2)] px-6 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink)] transition-colors duration-500"
              >
                {link.label}
                {/* The literal glyph, not &nearr; — JSX does not decode that
                    entity and it renders as the raw text "&nearr;". */}
                <span aria-hidden="true">&#8599;</span>
              </a>
            </Magnetic>
          ))}
        </motion.div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[var(--hair)] pt-7 sm:flex-row sm:items-center">
          <p className="eyebrow">
            &copy; {new Date().getFullYear()} &nbsp;/&nbsp; Gaurav Rege &nbsp;/&nbsp;
            Automation Engineer
          </p>

          <Magnetic strength={0.45}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="link-wipe flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-3)] transition-colors duration-500 hover:text-[var(--flare)]"
              aria-label="Back to top"
            >
              Back to top
              <span aria-hidden="true">&uarr;</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
