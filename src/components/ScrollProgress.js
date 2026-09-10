'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline bar across the top of the page that fills as you scroll.
 * Spring-smoothed so it glides rather than tracking the wheel exactly.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: width }}
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[var(--teal)] via-[var(--ochre)] to-[var(--teal)]"
      aria-hidden="true"
    />
  );
}
