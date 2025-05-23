
import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundPathsProps {
  className?: string;
}

export const BackgroundPaths: React.FC<BackgroundPathsProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute w-full h-full opacity-20"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,500 Q250,300 500,500 T1000,500"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          className="animate-pulse-slow"
        />
        <path
          d="M0,550 Q250,350 500,550 T1000,550"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          className="animate-pulse-slow animation-delay-2000"
        />
        <path
          d="M0,450 Q250,250 500,450 T1000,450"
          fill="none"
          stroke="url(#gradient3)"
          strokeWidth="1"
          className="animate-pulse-slow animation-delay-4000"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a4480" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#4d7cc7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1a4480" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4d7cc7" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#1a4480" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4d7cc7" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a4480" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#4d7cc7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1a4480" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
