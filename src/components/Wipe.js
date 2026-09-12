'use client';

import { motion } from 'framer-motion';
import useCalmMotion from '@/lib/useCalmMotion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Reveals its children by sliding a coloured curtain off them, rather
 * than by moving the content itself. The content never shifts, so text
 * stays pin-sharp the whole way through — moving type has to be
 * re-rendered at sub-pixel offsets and goes soft while it travels.
 *
 * The curtain is a scaleX on a single element: one composited transform.
 */
export default function Wipe({
  children,
  className = '',
  delay = 0,
  duration = 0.85,
  color = 'var(--flare)',
}) {
  const reduce = useCalmMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0, transformOrigin: 'right' }}
        viewport={{ once: true, margin: '0px 0px -70px 0px' }}
        transition={{ duration, delay, ease: EASE }}
      />
    </div>
  );
}
