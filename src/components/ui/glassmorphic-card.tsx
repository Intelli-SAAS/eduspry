
import React, { ReactNode } from 'react';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
