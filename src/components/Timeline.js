'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Timeline({ logs = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!logs || logs.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === logs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? logs.length - 1 : prev - 1));
  };

  const currentLog = logs[currentIndex];

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#f5f4f2] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Slider Container matching video aesthetic */}
        <div className="bg-[#dfdcd9] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            
            {/* Left Side: Title and Buttons */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
              <div>
                <motion.h2 
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1c1c1e] mb-4"
                >
                  Week {currentLog.week}
                </motion.h2>
                <motion.p
                  key={`date-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className="text-lg md:text-xl text-gray-600 mb-2"
                >
                  {currentLog.title}
                </motion.p>
                {currentLog.date && (
                   <motion.p
                   key={`realdate-${currentIndex}`}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   className="text-sm uppercase tracking-widest text-gray-500 font-semibold"
                 >
                   {currentLog.date}
                 </motion.p>
                )}
              </div>

              {/* Navigation Buttons (Desktop) */}
              <div className="hidden lg:flex gap-4 mt-auto pt-12">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  <span className="sr-only">Previous</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  <span className="sr-only">Next</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>

            {/* Right Side: Markdown Content */}
            <div className="col-span-1 lg:col-span-7 relative flex flex-col h-[50vh] min-h-[400px] max-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-[#1c1c1e] text-base md:text-lg leading-relaxed h-full overflow-y-auto pr-4 custom-scrollbar"
                >
                  <div
                    className="[&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-medium [&_h2]:mb-4 [&_h2]:mt-8 first:[&_h2]:mt-0 [&_ul]:list-none [&_ul]:space-y-4 [&_li]:relative [&_li]:pl-6 before:[&_li]:content-[''] before:[&_li]:absolute before:[&_li]:left-0 before:[&_li]:top-2.5 before:[&_li]:w-1.5 before:[&_li]:h-1.5 before:[&_li]:bg-black before:[&_li]:rounded-full [&_p]:mb-5 [&_blockquote]:border-l-2 [&_blockquote]:border-black/30 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_img]:rounded-2xl [&_img]:mt-8 [&_img]:w-full [&_img]:shadow-sm [&_pre]:bg-[#e9e6e4] [&_pre]:p-5 md:[&_pre]:p-6 [&_pre]:rounded-2xl [&_pre]:overflow-x-auto [&_pre]:max-w-[calc(100vw-6rem)] md:[&_pre]:max-w-full [&_pre]:border [&_pre]:border-black/5 [&_pre]:shadow-inner [&_code]:text-sm"
                    dangerouslySetInnerHTML={{ __html: currentLog.htmlContent }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons (Mobile) */}
              <div className="flex lg:hidden gap-4 mt-12">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Progress Timeline Slider Line */}
          <div className="relative mt-8 md:mt-16 flex items-center w-full h-12">
            {/* The horizontal line */}
            <div className="absolute left-4 right-4 h-[1px] bg-black/10" />
            
            {/* The dots */}
            <div className="absolute left-0 right-0 flex justify-between px-4">
              {logs.map((_, idx) => (
                <div 
                  key={idx} 
                  className="relative flex items-center justify-center w-6 h-6 cursor-pointer group" 
                  onClick={() => setCurrentIndex(idx)}
                >
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-black' : 'bg-black/20 group-hover:bg-black/50'}`} />
                  {/* Active Ring */}
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="activeRing"
                      className="absolute inset-0 rounded-full border-2 border-black"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
