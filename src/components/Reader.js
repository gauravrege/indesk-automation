'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

function Panel({ log, onClose, onStep, position, total }) {
  // Escape closes, arrows move between logs, and the page behind is locked
  // so the overlay does not scroll it.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex justify-center bg-[var(--void)]/95 px-4 py-6 sm:px-8 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={log.title}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 14, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex h-full w-full max-w-4xl flex-col border border-[var(--hair-2)] bg-[var(--surface)]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--hair)] px-6 py-5 sm:px-10">
          <div className="min-w-0">
            <p className="eyebrow mb-3">Week {String(log.week).padStart(2, '0')}</p>
            <h2 className="font-display truncate text-[1.3rem] text-[var(--ink)] sm:text-[1.7rem]">
              {log.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 border border-[var(--hair-2)] px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--ink-3)] transition-colors duration-400 hover:border-[var(--flare)] hover:text-[var(--flare)]"
          >
            ESC
          </button>
        </div>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-6 py-9 text-[0.93rem] leading-[1.95] text-[var(--ink-2)] sm:px-10">
          <div
            className="[&_h2]:font-mono [&_h2]:text-[10px] [&_h2]:leading-none [&_h2]:tracking-[0.3em] [&_h2]:uppercase [&_h2]:text-[var(--flare)] [&_h2]:font-normal [&_h2]:pb-4 [&_h2]:border-b [&_h2]:border-[var(--hair)] [&_h2]:mb-7 [&_h2]:mt-12 first:[&_h2]:mt-0 [&_ul]:list-none [&_ul]:space-y-5 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:w-2.5 [&_li]:before:h-px [&_li]:before:bg-[var(--flare)] [&_p]:mb-5 [&_strong]:font-medium [&_strong]:text-[var(--ink)] [&_blockquote]:border-l [&_blockquote]:border-[var(--flare)] [&_blockquote]:pl-6 [&_blockquote]:text-[var(--ink)] [&_blockquote]:my-9 [&_blockquote]:font-accent [&_blockquote]:text-[1.3rem] [&_blockquote]:leading-[1.6] [&_code]:font-mono [&_code]:text-[0.82em] [&_code]:text-[var(--flare-2)] [&_code]:bg-white/[0.05] [&_code]:px-1.5 [&_code]:py-0.5 [&_pre]:bg-[var(--surface-3)] [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--hair)] [&_pre]:my-6"
            dangerouslySetInnerHTML={{ __html: log.htmlContent }}
          />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[var(--hair)] px-6 py-4 sm:px-10">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="link-wipe font-mono text-[10px] tracking-[0.2em] text-[var(--ink-3)] transition-colors duration-400 hover:text-[var(--flare)]"
          >
            &larr; Previous
          </button>
          <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-[var(--ink-4)]">
            {String(position + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="link-wipe font-mono text-[10px] tracking-[0.2em] text-[var(--ink-3)] transition-colors duration-400 hover:text-[var(--flare)]"
          >
            Next &rarr;
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * The full-screen log reader.
 *
 * Portalled to <body> on purpose: the section this is used from sits inside
 * a wrapper with its own z-index, which makes a stacking context — a modal
 * rendered inside it can never rise above the fixed header no matter how
 * high its own z-index goes.
 */
export default function Reader({ logs, open, onClose, onStep }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open !== null && (
        <Panel
          log={logs[open]}
          position={open}
          total={logs.length}
          onClose={onClose}
          onStep={onStep}
        />
      )}
    </AnimatePresence>,
    document.body
  );
}
