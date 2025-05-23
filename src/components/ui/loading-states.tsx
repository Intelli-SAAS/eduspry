
import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="animate-pulse bg-white rounded-xl shadow p-6">
    <div className="w-16 h-16 mb-6 bg-gray-200 rounded-xl"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-100 rounded mb-3"></div>
    <div className="h-4 bg-gray-100 rounded mb-3"></div>
    <div className="h-4 bg-gray-100 rounded w-4/5"></div>
    <div className="mt-6 space-y-2">
      <div className="h-3 bg-gray-100 rounded"></div>
      <div className="h-3 bg-gray-100 rounded"></div>
      <div className="h-3 bg-gray-100 rounded w-4/5"></div>
    </div>
  </div>
);

export const MetricSkeleton: React.FC = () => (
  <div className="animate-pulse p-6 bg-white/5 rounded-lg">
    <div className="h-10 bg-white/10 rounded mb-2"></div>
    <div className="h-4 bg-white/10 rounded w-2/3"></div>
  </div>
);

export const FeatureCardSkeleton: React.FC = () => (
  <div className="animate-pulse flex-shrink-0 w-80 h-56 bg-gray-100 rounded-xl p-6">
    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

export const LearningPathSkeleton: React.FC = () => (
  <div className="py-16 sm:py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-72 mx-auto"></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative mb-12 animate-pulse">
            <div className="ml-12 bg-white rounded-lg p-6 shadow">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded mb-2"></div>
              <div className="h-4 bg-gray-100 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-spin ${className || "w-5 h-5"}`} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
