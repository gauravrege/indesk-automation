'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const GLYPHS = '#%&/\\<>*+=-_:;!?$@0123456789';

function noise() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Text that arrives scrambled and resolves left to right.
 *
 * The real string is what renders on the server and on the first client
 * pass, so hydration matches; the scramble only starts once mounted.
 * Spaces and punctuation are never scrambled — keeping the word shapes
 * intact is what makes it read as decoding rather than as noise.
 *
 * Ticks on an interval rather than every frame: it is a text swap, which
 * repaints, and there is no reason to do that 60 times a second.
 */
export default function Decode({
  text,
  as: Tag = 'span',
  className = '',
  tick = 38,
  charsPerTick = 0.6,
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once, margin: '0px 0px -70px 0px' });

  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(text);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduce) {
      setDisplay(text);
      return;
    }

    const chars = Array.from(text);
    const scrambled = () =>
      chars.map((c) => (c.trim() === '' ? c : noise())).join('');

    if (!inView) {
      setDisplay(scrambled());
      return;
    }

    let revealed = 0;
    let timer;

    const start = setTimeout(() => {
      timer = setInterval(() => {
        revealed += charsPerTick;
        const cut = Math.floor(revealed);

        if (cut >= chars.length) {
          clearInterval(timer);
          setDisplay(text);
          return;
        }

        setDisplay(
          chars
            .map((c, i) => (i < cut || c.trim() === '' ? c : noise()))
            .join('')
        );
      }, tick);
    }, delay * 1000);

    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [mounted, inView, reduce, text, tick, charsPerTick, delay]);

  return (
    <Tag ref={ref} className={`decoding ${className}`} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
