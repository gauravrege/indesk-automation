'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [-1, 2, -1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gray-950 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pb-24">
      {/* Animated gradient mesh & background overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated multi-color gradient background */}
        <div className="animated-mesh-bg absolute inset-0 opacity-40 mix-blend-screen" />

        {/* Ambient glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-3xl pointer-events-none"
        />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Floating Decorative Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-950/40 backdrop-blur-md shadow-lg shadow-purple-950/50"
          >
            <span className="flex h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              Streamlining Operations & Workflows
            </span>
          </motion.div>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
            Internship Work Tracker
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-200/90 mb-6 tracking-tight"
        >
          Automation Engineer Intern
        </motion.h2>

        {/* One-liner Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Automating manual workflows to save 15+ hours per week
        </motion.p>

        {/* Decorative Floating Widget */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md mt-2 p-1 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-gray-900/80 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium">Efficiency Impact</p>
                <p className="text-sm font-semibold text-gray-100">15+ hrs/wk Reclaimed</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Track
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Embedded CSS for shifting gradient animation */}
      <style jsx>{`
        .animated-mesh-bg {
          background: linear-gradient(
            -45deg,
            rgba(147, 51, 234, 0.4),
            rgba(59, 130, 246, 0.4),
            rgba(236, 72, 153, 0.4),
            rgba(126, 34, 206, 0.4)
          );
          background-size: 300% 300%;
          animation: shiftGradient 14s ease infinite;
        }

        @keyframes shiftGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
