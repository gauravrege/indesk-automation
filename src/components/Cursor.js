'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A two-part cursor: a hard sand dot that tracks the pointer exactly, and a
 * ring that lags behind on a spring and opens up over anything clickable.
 *
 * Only mounts for a real mouse (pointer: fine) and only when the visitor has
 * not asked for reduced motion — touch devices and keyboard users keep the
 * native behaviour untouched. Position is written straight to motion values,
 * so this never triggers a React render while the mouse moves.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The ring trails; the dot does not. That gap is the whole effect.
  const ringX = useSpring(x, { stiffness: 170, damping: 20, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 170, damping: 20, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;

    setEnabled(true);
    document.documentElement.classList.add('cursor-hidden');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(
        Boolean(e.target?.closest?.('a, button, [role="button"], [data-cursor]'))
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('cursor-hidden');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-[var(--flare)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.9 : 1,
          borderColor: hovering
            ? 'rgba(255,74,28,0.85)'
            : 'rgba(246,244,240,0.32)',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[13px] -mt-[13px] h-[26px] w-[26px] rounded-full border"
      />
    </>
  );
}
