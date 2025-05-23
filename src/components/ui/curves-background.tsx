
import React from "react";
import { cn } from "@/lib/utils";

interface CurvesBackgroundProps {
  className?: string;
}

export const CurvesBackground: React.FC<CurvesBackgroundProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute w-full h-full opacity-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,1000 C300,800 700,900 1000,1000 V1000 H0 V0 Z"
          fill="url(#curve1)"
          className="animate-blob"
        />
        <path
          d="M0,1000 C150,900 800,950 1000,1000 V1000 H0 V0 Z"
          fill="url(#curve2)"
          className="animate-blob animation-delay-2000"
        />
        <path
          d="M0,1000 C500,950 700,800 1000,1000 V1000 H0 V0 Z"
          fill="url(#curve3)"
          className="animate-blob animation-delay-4000"
        />

        <defs>
          <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a4480" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#4d7cc7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1a4480" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="curve2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4d7cc7" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#1a4480" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4d7cc7" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="curve3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a4480" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#4d7cc7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a4480" stopOpacity="0.03" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
