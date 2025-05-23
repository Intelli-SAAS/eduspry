
import React from 'react';
import { motion } from 'framer-motion';

export const CurvesBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1440 800" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100 V800 H0 V100Z"
          fill="url(#gradient1)"
          opacity="0.05"
          initial={{ d: "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100 V800 H0 V100Z" }}
          animate={{ 
            d: [
              "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100 V800 H0 V100Z",
              "M0,150 C320,250 420,50 720,150 C1020,250 1120,50 1440,150 V800 H0 V150Z",
              "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100 V800 H0 V100Z"
            ]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,120 C320,220 420,20 720,120 C1020,220 1120,20 1440,120 V800 H0 V120Z"
          fill="url(#gradient2)"
          opacity="0.05"
          initial={{ d: "M0,120 C320,220 420,20 720,120 C1020,220 1120,20 1440,120 V800 H0 V120Z" }}
          animate={{ 
            d: [
              "M0,120 C320,220 420,20 720,120 C1020,220 1120,20 1440,120 V800 H0 V120Z",
              "M0,170 C320,270 420,70 720,170 C1020,270 1120,70 1440,170 V800 H0 V170Z",
              "M0,120 C320,220 420,20 720,120 C1020,220 1120,20 1440,120 V800 H0 V120Z"
            ]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="720" y1="0" x2="720" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1a4480" />
            <stop offset="1" stopColor="#1a4480" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="720" y1="0" x2="720" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4d7cc7" />
            <stop offset="1" stopColor="#4d7cc7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
