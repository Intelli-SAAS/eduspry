import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Neural network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="neural-network" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="#1a4480" />
            <circle cx="40" cy="40" r="1.5" fill="#1a4480" />
            <circle cx="40" cy="10" r="1.5" fill="#1a4480" />
            <circle cx="10" cy="40" r="1.5" fill="#1a4480" />
            <line x1="10" y1="10" x2="40" y2="40" stroke="#1a4480" strokeWidth="0.5" />
            <line x1="40" y1="10" x2="10" y2="40" stroke="#1a4480" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="40" y2="10" stroke="#1a4480" strokeWidth="0.5" />
            <line x1="10" y1="40" x2="40" y2="40" stroke="#1a4480" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="10" y2="40" stroke="#1a4480" strokeWidth="0.5" />
            <line x1="40" y1="10" x2="40" y2="40" stroke="#1a4480" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural-network)" />
        </svg>

        {/* Digital circuit pattern at the bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-[30%] opacity-[0.07]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,160 L40,160 L40,140 L80,140 L80,180 L120,180 L120,140 L200,140 L200,160 L280,160 L280,120 L360,120 L360,180 L440,180 L440,120 L520,120 L520,160 L600,160 L600,140 L680,140 L680,180 L760,180 L760,140 L840,140 L840,160 L920,160 L920,120 L1000,120 L1000,180 L1080,180 L1080,120 L1160,120 L1160,160 L1240,160 L1240,140 L1320,140 L1320,180 L1400,180 L1400,140 L1440,140 L1440,320 L0,320 Z"
            fill="none" stroke="#1a4480" strokeWidth="2" />
          <circle cx="40" cy="160" r="4" fill="#2c5aa0" />
          <circle cx="80" cy="140" r="4" fill="#2c5aa0" />
          <circle cx="120" cy="180" r="4" fill="#2c5aa0" />
          <circle cx="200" cy="140" r="4" fill="#2c5aa0" />
          <circle cx="280" cy="160" r="4" fill="#2c5aa0" />
          <circle cx="360" cy="120" r="4" fill="#2c5aa0" />
          <circle cx="440" cy="180" r="4" fill="#2c5aa0" />
          <circle cx="520" cy="120" r="4" fill="#2c5aa0" />
          <circle cx="600" cy="160" r="4" fill="#2c5aa0" />
          <circle cx="680" cy="140" r="4" fill="#2c5aa0" />
          <circle cx="760" cy="180" r="4" fill="#2c5aa0" />
          <circle cx="840" cy="140" r="4" fill="#2c5aa0" />
          <circle cx="920" cy="160" r="4" fill="#2c5aa0" />
          <circle cx="1000" cy="120" r="4" fill="#2c5aa0" />
          <circle cx="1080" cy="180" r="4" fill="#2c5aa0" />
          <circle cx="1160" cy="120" r="4" fill="#2c5aa0" />
          <circle cx="1240" cy="160" r="4" fill="#2c5aa0" />
          <circle cx="1320" cy="140" r="4" fill="#2c5aa0" />
          <circle cx="1400" cy="180" r="4" fill="#2c5aa0" />
        </svg>
      </div>

      {/* Educational symbols */}
      <div className="absolute top-[10%] right-[10%] w-[180px] h-[180px] opacity-[0.06]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" fill="#1a4480" />
          <path d="M12 3L1 9L12 15L23 9L12 3Z" stroke="#1a4480" strokeWidth="1" />
        </svg>
      </div>

      {/* Lightbulb - representing ideas and learning */}
      <div className="absolute bottom-[20%] left-[15%] w-[150px] h-[150px] opacity-[0.06]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z" fill="#1a4480" />
        </svg>
      </div>

      {/* Code symbols */}
      <div className="absolute top-[40%] left-[10%] w-[100px] h-[100px] opacity-[0.05]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" fill="#2c5aa0" />
        </svg>
      </div>

      {/* Books icon - representing education and knowledge */}
      <div className="absolute top-[60%] right-[12%] w-[120px] h-[120px] opacity-[0.05]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="#1a4480" />
        </svg>
      </div>

      {/* AI Brain concept */}
      <div className="absolute top-[30%] right-[30%] w-[250px] h-[250px] opacity-[0.04]">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="#1a4480" d="M208 348.5c0 38.5 13.3 67.2 32 85.1V256c-18.7 17.9-32 46.5-32 92.5zm96 85.1c18.7-17.9 32-46.5 32-85.1 0-38.5-13.3-67.2-32-85.1v170.2z" />
        </svg>
      </div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
            style={{
              height: `${Math.random() * 15 + 10}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              y: [0, 100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Render children */}
      {children}
    </div>
  );
};
