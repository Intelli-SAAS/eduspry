import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => (
  <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100">
    <Skeleton className="h-12 w-12 rounded-lg mb-6" />
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const MetricSkeleton = () => (
  <div className="p-4 sm:p-6 bg-white/5 rounded-lg backdrop-blur-sm">
    <Skeleton className="h-8 w-20 bg-white/10 mb-2" />
    <Skeleton className="h-4 w-16 bg-white/10" />
  </div>
);

export const FeatureCardSkeleton = () => (
  <div className="flex-shrink-0 w-[340px] bg-gray-50 rounded-xl shadow-md overflow-hidden">
    <Skeleton className="h-[200px] w-full" />
    <div className="p-5">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

export const LoadingSpinner = ({ className }: { className?: string }) => (
  <motion.div
    className={cn("inline-flex items-center justify-center", className)}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </motion.div>
);

export const LearningPathSkeleton = () => (
  <div className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-32 mx-auto mb-4 rounded-full" />
        <Skeleton className="h-12 w-2/3 mx-auto mb-4" />
        <Skeleton className="h-1 w-36 mx-auto" />
      </div>
      
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute h-full top-0 left-[15px] lg:left-[50%] lg:-ml-[1px] w-[2px] bg-gray-200" />
        
        {[1, 2, 3, 4].map((_, index) => (
          <div 
            key={index}
            className={`relative mb-12 lg:mb-16 ${index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:ml-auto'}`}
          >
            <div className={`flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
              <div className="relative bg-white border-2 border-gray-100 max-w-md p-4 lg:p-6 rounded-lg shadow-sm">
                <Skeleton className="absolute top-[15px] -left-[35px] lg:left-auto lg:top-[21px] w-8 h-8 rounded-full" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
