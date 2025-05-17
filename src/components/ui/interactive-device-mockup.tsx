
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const InteractiveDeviceMockup: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className="relative mt-16 max-w-4xl mx-auto w-full"
      style={{ y, opacity, scale }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <div className="relative">
        {/* Laptop */}
        <div className="relative z-10 shadow-2xl rounded-lg mx-auto max-w-3xl overflow-hidden">
          <div className="bg-gray-800 p-1.5 rounded-t-lg">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-[240px] sm:h-[320px] flex items-center justify-center p-4">
            <div className="rounded-lg overflow-hidden shadow-inner w-full h-full bg-white">
              <div className="h-12 bg-[#1a4480] flex items-center px-4">
                <div className="w-24 h-4 bg-white/20 rounded"></div>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4 h-[calc(100%-48px)]">
                <div className="col-span-1 bg-gray-50 rounded-lg p-2 h-full">
                  <div className="w-full h-5 bg-gray-200 rounded mb-3"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="w-1/2 h-8 bg-blue-500 rounded"></div>
                </div>
                <div className="col-span-1 bg-gray-50 rounded-lg flex items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#1a4480]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tablet floating on the left */}
        <motion.div
          className="absolute left-0 -ml-16 top-1/2 transform -translate-y-1/2 hidden md:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div className="bg-gray-800 p-1 rounded-xl shadow-xl">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-[160px] w-[120px] rounded-lg p-2">
              <div className="bg-white h-full rounded overflow-hidden">
                <div className="h-4 bg-[#1a4480] w-full"></div>
                <div className="p-1">
                  <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Phone floating on the right */}
        <motion.div
          className="absolute right-0 -mr-12 top-1/4 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
        >
          <div className="bg-gray-800 p-1 rounded-xl shadow-xl">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-[120px] w-[60px] rounded-lg p-1">
              <div className="bg-white h-full rounded overflow-hidden">
                <div className="h-3 bg-[#1a4480] w-full"></div>
                <div className="p-1">
                  <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                  <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
