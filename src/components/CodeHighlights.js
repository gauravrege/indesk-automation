'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { codeHighlights } from '@/data/codeHighlights';

const EASE = [0.22, 1, 0.36, 1];

const KEYWORDS = {
  javascript:
    'const|let|var|function|return|if|else|for|of|in|while|break|continue|new|typeof|null|true|false|this|class|try|catch|throw|await|async|import|export|from|default',
  python:
    'def|return|if|elif|else|for|in|while|break|continue|not|and|or|None|True|False|import|from|as|class|try|except|raise|with|lambda|yield|pass|set|list|str|int',
};

/**
 * A small purpose-built tokenizer. A general-purpose highlighter theme would
 * fight this palette; this one only needs to know comments, strings, numbers
 * and keywords, and it colours them in the site's own tones.
 *
 * Order in the alternation matters: comments and strings are consumed before
 * anything inside them can be mistaken for a keyword.
 */
function highlight(code, lang) {
  const kw = KEYWORDS[lang] || KEYWORDS.javascript;
  const re = new RegExp(
    [
      '(\\/\\/[^\\n]*|#[^\\n]*)',                              // 1 comment
      '("""[\\s\\S]*?"""|"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')', // 2 string
      '(\\b0x[0-9a-fA-F]+\\b|\\b\\d+(?:\\.\\d+)?\\b)',          // 3 number
      `\\b(${kw})\\b`,                                          // 4 keyword
    ].join('|'),
    'g'
  );

  const out = [];
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push({ t: code.slice(last, m.index), k: 'plain', i: i++ });
    const kind = m[1] ? 'comment' : m[2] ? 'string' : m[3] ? 'number' : 'keyword';
    out.push({ t: m[0], k: kind, i: i++ });
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push({ t: code.slice(last), k: 'plain', i: i++ });
  return out;
}

const TONE = {
  plain: 'text-[var(--bone-2)]',
  comment: 'text-[var(--bone-4)] italic',
  string: 'text-[var(--sand)]',
  number: 'text-[var(--sand-dim)]',
  keyword: 'text-[var(--bone)]',
};

export default function CodeHighlights() {
  const [active, setActive] = useState(0);
  const item = codeHighlights[active];

  return (
    <section id="code" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mb-12 flex items-baseline justify-between gap-6 border-b border-[var(--hair)] pb-6"
        >
          <h2 className="font-display text-[2.4rem] leading-none text-[var(--bone)] md:text-[3.25rem]">
            Engineering
          </h2>
          <p className="eyebrow shrink-0">From the repositories</p>
        </motion.div>

        {/* Selector */}
        <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3">
          {codeHighlights.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(idx)}
              aria-pressed={idx === active}
              className={`text-[0.74rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                idx === active
                  ? 'text-[var(--sand)]'
                  : 'text-[var(--bone-4)] hover:text-[var(--bone-2)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
          >
            {/* Explanation */}
            <div className="col-span-1 lg:col-span-4">
              <p className="mb-6 text-[0.92rem] leading-[1.95] text-[var(--bone-2)]">
                {item.blurb}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe inline-block font-mono text-[11px] tracking-[0.12em] text-[var(--bone-4)] transition-colors duration-500 hover:text-[var(--sand)]"
              >
                {item.repo} / {item.file}
              </a>
            </div>

            {/* Code */}
            <div className="col-span-1 min-w-0 lg:col-span-8">
              <div className="border border-[var(--hair)] bg-[var(--surface)]">
                <div className="flex items-center justify-between border-b border-[var(--hair)] px-5 py-3">
                  <span className="eyebrow">{item.lang}</span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--bone-4)]">
                    {item.code.split('\n').length} lines
                  </span>
                </div>
                <pre className="custom-scrollbar overflow-x-auto px-5 py-5 text-[0.78rem] leading-[1.75] md:text-[0.82rem]">
                  <code className="font-mono">
                    {highlight(item.code, item.lang).map((tok) => (
                      <span key={tok.i} className={TONE[tok.k]}>
                        {tok.t}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
