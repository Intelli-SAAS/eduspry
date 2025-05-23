
import React from 'react';

interface BackgroundPathsProps {
  className?: string;
}

export const BackgroundPaths: React.FC<BackgroundPathsProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full"
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C150,200 350,0 500,100 C650,200 700,0 900,100 C1050,180 1150,100 1200,120 L1200,800 L0,800 Z"
          className="fill-blue-100/40 opacity-30"
        />
        <path
          d="M0,200 C150,280 350,180 500,200 C650,220 700,180 900,200 C1050,220 1150,200 1200,200 L1200,800 L0,800 Z"
          className="fill-indigo-100/30 opacity-30"
          style={{ animationDelay: "0.2s" }}
        />
        <path
          d="M0,280 C150,300 350,250 500,280 C650,300 700,250 900,280 C1050,300 1150,280 1200,280 L1200,800 L0,800 Z"
          className="fill-blue-50/50 opacity-30"
          style={{ animationDelay: "0.4s" }}
        />
        <path
          className="animate-pulse-slow"
          d="M0,0 C150,300 350,200 500,300 C650,400 700,300 900,400 C1050,480 1150,400 1200,420 L1200,800 L0,800 Z"
          fill="none"
          stroke="rgba(96, 165, 250, 0.05)"
          strokeWidth="2"
        />
        <path
          className="animate-pulse-slow animation-delay-2000"
          d="M0,100 C150,400 350,300 500,400 C650,500 700,400 900,500 C1050,580 1150,500 1200,520 L1200,800 L0,800 Z"
          fill="none"
          stroke="rgba(79, 70, 229, 0.05)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
