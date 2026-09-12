'use client';

/**
 * A band that never stops moving. Pure CSS: the track holds two identical
 * copies of the list and translates to -50%, which lands exactly on the
 * seam, so the loop is invisible.
 *
 * There is no JS in the loop at all — it runs on the compositor, which is
 * why the page can afford to keep one running the whole time.
 */
export default function Marquee({
  items = [],
  reverse = false,
  duration = 46,
  className = '',
}) {
  if (items.length === 0) return null;

  const Row = ({ hidden }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden ? 'true' : undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="font-display whitespace-nowrap px-7 text-[1.05rem] tracking-[-0.02em] text-[var(--ink-3)] md:px-10 md:text-[1.3rem]">
            {item}
          </span>
          <span
            className="block h-1 w-1 shrink-0 rotate-45 bg-[var(--flare)]"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee marquee-mask relative overflow-hidden border-y border-[var(--hair)] py-4 md:py-5 ${className}`}
    >
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {/* Copy one is the readable one; copy two exists only to make the
            wrap seamless, so it is hidden from screen readers. */}
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
