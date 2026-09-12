'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

/* Each stage is something that actually happens. Verified 2026-09-12:
   the live site responds with `Server: Vercel` and `X-Nextjs-Prerender: 1`,
   the repo has no CI config of its own (Vercel's own Git integration does
   the work), and `next build` reports the route as static. */
const stages = [
  {
    key: 'push',
    title: 'git push',
    detail: 'One markdown file per week, committed to main.',
    mono: 'content/logs/week-10.md',
  },
  {
    key: 'github',
    title: 'GitHub',
    detail: 'The push fires a webhook at the connected project.',
    mono: 'gauravrege/indesk-automation',
  },
  {
    key: 'build',
    title: 'Vercel build',
    detail: 'Next.js reads every log at build time and prerenders the page.',
    mono: 'next build',
  },
  {
    key: 'live',
    title: 'This page',
    detail: 'Served as static HTML. No markup is written by hand.',
    mono: 'indesk-automation.vercel.app',
  },
];

function Wire({ delay }) {
  return (
    <>
      {/* Horizontal between columns on desktop. A fixed width, NOT flex-1 —
          as a flex item it grew at the same rate as the cards and squeezed
          them until the file paths were breaking mid-word. */}
      <div
        className="wire wire-x hidden h-px w-10 shrink-0 self-center bg-[var(--hair)] md:block lg:w-14"
        style={{ '--wire-delay': `${delay}s` }}
        aria-hidden="true"
      />
      {/* vertical between rows on mobile */}
      <div
        className="wire wire-y ml-5 h-9 w-px bg-[var(--hair)] md:hidden"
        style={{ '--wire-delay': `${delay}s` }}
        aria-hidden="true"
      />
    </>
  );
}

export default function Pipeline() {
  return (
    <section id="how" className="relative px-4 py-24 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-14 flex items-end justify-between gap-6 border-b border-[var(--hair)] pb-6"
        >
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2.5">
              <span className="pulse-dot" aria-hidden="true" />
              Continuous deployment
            </p>
            <Decode
              text="This page publishes itself"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">Static · prerendered</p>
        </motion.div>

        <motion.ol
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -70px 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col md:flex-row md:items-stretch"
        >
          {stages.map((stage, i) => (
            <Fragment key={stage.key}>
              <li className="group relative flex-1 border border-[var(--hair)] bg-[var(--surface)] p-6 transition-colors duration-500 hover:border-[var(--hair-2)] md:p-7">
                <p className="eyebrow mb-5">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display mb-3 text-[1.2rem] leading-tight text-[var(--ink)] md:text-[1.35rem]">
                  {stage.title}
                </h3>
                <p className="mb-5 text-[0.85rem] leading-[1.7] text-[var(--ink-3)]">
                  {stage.detail}
                </p>
                <p className="font-mono text-[10px] leading-relaxed tracking-[0.04em] text-[var(--flare-2)] [overflow-wrap:anywhere]">
                  {stage.mono}
                </p>
              </li>
              {i < stages.length - 1 && <Wire delay={i * 0.55} />}
            </Fragment>
          ))}
        </motion.ol>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="mt-12 max-w-3xl text-[0.98rem] leading-[1.8] text-[var(--ink-3)] md:text-[1.05rem]"
        >
          Adding a week is one markdown file and a push. Nothing on this page is
          typed into HTML &mdash; the project entries, the dates, the tags and the
          links are all read out of{' '}
          <span className="font-mono text-[0.88em] text-[var(--flare-2)]">
            content/logs/
          </span>{' '}
          when the site builds, and every project links to the repository its code
          actually lives in.
        </motion.p>
      </div>
    </section>
  );
}
