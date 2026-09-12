'use client';

import { motion } from 'framer-motion';
import Odometer from './Odometer';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

/* Every figure here is traceable to a specific week's log — the `note` says
   which. Do not add a number that cannot be pointed at.
   ("15+ hours saved weekly" and "100% reconciled" used to sit in this list.
   Neither appears anywhere in the logs or the code, so both are gone.) */
const impactMetrics = [
  {
    value: 10, suffix: '',
    label: 'Tools shipped',
    note: 'Weeks 01–10, July to September 2026',
  },
  {
    value: 9090, suffix: '',
    label: 'Rows behind the dues dashboard',
    note: 'The InDesk outstanding report — 14 regions, 4 zones · weeks 01–02',
  },
  {
    value: 10000, suffix: '+',
    label: 'Transaction rows per run',
    note: 'Customer statements merged in a single pass · week 09',
  },
  {
    value: 40, suffix: '+',
    label: 'Customer sheets consolidated',
    note: 'One sheet per customer, spread across several workbooks · week 09',
  },
  {
    value: 30, suffix: 's',
    label: 'Replaces a full day of copying',
    note: 'Statement consolidation, previously done by hand · week 09',
  },
  {
    value: 15, suffix: 'min',
    label: 'Of daily portal work removed',
    note: 'Log in, export, filter, paste — now unattended · week 04',
  },
];

export default function ImpactDashboard() {
  return (
    <section id="impact" className="relative px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-14 flex items-end justify-between gap-6 border-b border-[var(--hair)] pb-6 md:mb-18"
        >
          <div>
            <p className="eyebrow mb-5">Sourced from the logs below</p>
            <Decode
              text="The numbers"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">Weeks 01–10</p>
        </motion.div>

        <ul>
          {impactMetrics.map((metric, i) => (
            <motion.li
              key={metric.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -70px 0px' }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
              className="sweep group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-[var(--hair)] px-2 py-7 sm:grid-cols-[minmax(0,1fr)_auto] md:py-9"
            >
              <span className="font-display-xl text-[2.8rem] leading-[0.9] text-[var(--ink)] transition-colors duration-700 group-hover:text-[var(--flare)] sm:text-[3.4rem] md:text-[4.4rem]">
                <Odometer value={metric.value} suffix={metric.suffix} />
              </span>

              <span className="flex flex-col gap-2 sm:items-end sm:text-right">
                <span className="eyebrow transition-colors duration-700 group-hover:text-[var(--ink-2)]">
                  {metric.label}
                </span>
                <span className="text-[0.82rem] leading-[1.6] text-[var(--ink-4)]">
                  {metric.note}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-14 max-w-3xl text-[0.98rem] leading-[1.8] text-[var(--ink-3)] md:text-[1.05rem]"
        >
          Each figure comes from the log it sits next to. The statement tool also
          checks its own arithmetic on every sheet &mdash;{' '}
          <span className="font-mono text-[0.88em] text-[var(--flare-2)]">
            Opening Bal. + sum(Net Amount)
          </span>{' '}
          has to equal the total printed on that sheet, or the run fails rather than
          quietly handing back a short table.
        </motion.p>
      </div>
    </section>
  );
}
