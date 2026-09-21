'use client';

import { motion } from 'framer-motion';
import Odometer from './Odometer';
import Decode from './Decode';

const EASE = [0.22, 1, 0.36, 1];

/* Every figure here is traceable to a specific week's log — the `note` says
   which. Do not add a number that cannot be pointed at.
   ("15+ hours saved weekly" and "100% reconciled" used to sit in this list.
   Neither appears anywhere in the logs or the code, so both are gone. There is
   still no aggregate hours-saved figure here for the same reason — the saving
   is stated per tool, where it can be checked.)

   The dues dashboard is deliberately absent: that project is not finished, so
   it does not get to be a headline number. Its 9,090-row figure was here.

   Rows are mentioned once, on purpose. The rest of the list is time and
   hand-work removed, which is what these tools are actually for.

   The count is 10 tools over 11 logged weeks: week 05 is this site, which is
   not a tool. Keep that stated in the note or the two numbers read as a slip. */
const impactMetrics = [
  {
    value: 10, suffix: '',
    label: 'Tools made',
    note: 'Over 11 logged weeks, July to September 2026 · week 05 is this site, not a tool',
  },
  {
    value: 30, suffix: 's',
    label: 'Replaces a full day of copying',
    note: 'Customer statements, merged by hand one sheet at a time until week 09',
  },
  {
    value: 2, suffix: 's',
    label: 'To read a folder of 141 invoices',
    note: 'GST invoices from 13 airlines — an afternoon of typing before this · week 11',
  },
  {
    value: 15, suffix: 'min',
    label: 'Of daily portal work removed',
    note: 'Log in, export, filter, paste — the bot now does the round on its own · week 04',
  },
  {
    value: 10000, suffix: '+',
    label: 'Rows merged in a single run',
    note: '40+ customer sheets pulled into one table · week 09',
  },
  {
    value: 3, suffix: '',
    label: 'Tools that prove their own figures',
    note: 'Each one checks its totals and names the file when they disagree · weeks 09, 10, 11',
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
            <p className="eyebrow mb-5">Every number comes from a log below</p>
            <Decode
              text="The numbers"
              as="h2"
              className="font-display type-big block text-[var(--ink)]"
            />
          </div>
          <p className="eyebrow hidden shrink-0 sm:block">Weeks 01–11</p>
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
          Every figure here comes from the log it sits next to, and the pattern
          behind all of them is the same one. Work that used to fill a morning or a
          whole day &mdash; copying statement sheets together, typing invoices in one
          by one, doing the portal round &mdash; now takes seconds. None of it is
          faster guesswork: each tool checks its own totals, and when they do not
          agree it stops and names the file instead of handing back a number nobody
          can trust.
        </motion.p>
      </div>
    </section>
  );
}
