
import React from "react";
import { cn } from "@/lib/utils";

interface FloatingDotsProps {
  className?: string;
}

export const FloatingDots: React.FC<FloatingDotsProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            i % 3 === 0 ? "bg-blue-500" : i % 3 === 1 ? "bg-indigo-500" : "bg-blue-300",
            "opacity-10"
          )}
          style={{
            width: `${Math.random() * 12 + 2}px`,
            height: `${Math.random() * 12 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatingUp ${Math.random() * 5 + 5}s ease-in-out ${Math.random() * 5}s infinite alternate`
          }}
        />
      ))}
    </div>
  );
};
