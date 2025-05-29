import React from 'react';
import { BackgroundPaths } from './background-paths';

interface EduSpryHeroBackgroundProps {
  children: React.ReactNode;
}

export const EduSpryHeroBackground: React.FC<EduSpryHeroBackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Animated Background Paths - positioned to be visible */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaths title="" />
      </div>
      
      {/* Overlay to ensure text readability while keeping paths visible */}
      <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-[0.5px]" />
      
      {/* Content */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};
