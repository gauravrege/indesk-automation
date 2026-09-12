'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Whether to drop animation, safe to branch DOM on.
 *
 * `useReducedMotion` reads the media query and can already return true on
 * the client's very first render, while the server rendered with no
 * knowledge of it. Anything that renders different markup — or even a
 * different style attribute — from that value then fails to hydrate.
 *
 * Reporting false until after mount keeps the first client pass identical
 * to what the server sent; the swap happens on the next render, which is
 * a normal update rather than a hydration mismatch.
 */
export default function useCalmMotion() {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefers);
}
