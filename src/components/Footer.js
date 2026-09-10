'use client';

import { motion } from 'framer-motion';

const links = [
  { label: 'GitHub', href: 'https://github.com/gauravrege' },
  // LinkedIn intentionally omitted until the real profile URL is known —
  // a dead link reads worse than no link at all.
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f5f4f2] pb-12 pt-20">
      {/* Oversized wordmark, cropped by the section edge */}
      <div className="pointer-events-none select-none px-4 sm:px-6 lg:px-8" aria-hidden="true">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.055, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl whitespace-nowrap text-center text-[11vw] font-medium leading-[0.85] tracking-tighter text-black"
        >
          Gaurav Rege
        </motion.p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-between gap-6 border-t border-gray-300 pt-8 md:flex-row"
        >
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-600">
              &copy; {new Date().getFullYear()} Gaurav Rege
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Automation Engineer Intern &middot; Mumbai
            </p>
          </div>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-sm font-medium text-gray-500 transition-colors hover:text-black"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white"
              aria-label="Back to top"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
