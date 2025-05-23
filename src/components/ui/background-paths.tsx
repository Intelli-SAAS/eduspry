
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const BackgroundPaths: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.3">
          <motion.path
            d="M0,500 Q250,400 500,500 T1000,500"
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M0,600 Q250,500 500,600 T1000,600" 
            fill="none" 
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path
            d="M0,400 Q250,300 500,400 T1000,400" 
            fill="none" 
            stroke="rgba(79, 70, 229, 0.25)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          />
        </g>
      </svg>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
      
      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-blob"></div>
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  );
};
