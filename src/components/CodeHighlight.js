'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const recoveryCode = `// Self-Healing Recovery: If the website crashes to a white screen,
// automatically reload and retry the Outstanding Details export
try {
    const reportsMenu = invoiceFrame.locator('.clsmainmenu')
        .filter({ hasText: /^Reports$/i }).first();
    await reportsMenu.waitFor({ state: 'visible', timeout: 10000 });
    await reportsMenu.click();
} catch (e) {
    console.log('⚠️ Website crashed! Initiating recovery...');
    // Click Accounts tab to force-reload the iframe
    await page.getByText(/accounts/i).first().click();
    // Wait for iframe to respawn
    await invoiceFrame.locator('span[data-key="t-Payemt"]')
        .waitFor({ state: 'visible', timeout: 60000 });
    console.log('✅ Iframe recovered! Retrying...');
}`;

export default function CodeHighlight() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(recoveryCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <section className="w-full bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Code Highlights
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Built a self-healing automation script that detects website crashes and automatically recovers without human intervention.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-gray-400">recovery-handler.js</span>
            </div>
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <span className="text-emerald-400 font-semibold">✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-2 sm:p-4 text-xs sm:text-sm font-mono overflow-x-auto">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontSize: 'inherit',
                lineHeight: '1.6',
              }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {recoveryCode}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
