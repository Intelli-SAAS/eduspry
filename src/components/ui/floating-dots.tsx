
import React from 'react';

interface FloatingDotsProps {
  className?: string;
}

export const FloatingDots: React.FC<FloatingDotsProps> = ({ className = "" }) => {
  // Generate random dots with different positions and sizes
  const dots = Array.from({ length: 50 }).map((_, index) => {
    const size = Math.floor(Math.random() * 5) + 2; // 2-6px dots
    const delay = Math.random() * 5; // 0-5s animation delay
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 opacity
    return { size, delay, left, top, opacity, id: index };
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-blue-500 animate-float"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: dot.left,
            top: dot.top,
            opacity: dot.opacity,
            animationDelay: `${dot.delay}s`
          }}
        />
      ))}
    </div>
  );
};
