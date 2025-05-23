
import React from 'react';
import { motion } from 'framer-motion';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress?: number; // 0 to 100
  isCompleted?: boolean;
}

interface BadgeDisplayProps {
  badges: Badge[];
  title: string;
  subtitle: string;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges, title, subtitle }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`aspect-square rounded-xl flex flex-col items-center justify-center p-6 relative ${badge.isCompleted ? 'bg-gradient-to-br ' + badge.color : 'bg-gray-200'}`}>
                {/* Completion overlay */}
                {badge.progress !== undefined && badge.progress < 100 && (
                  <>
                    <svg className="absolute inset-0 w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8%"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke={badge.color.split(' ')[1]}
                        strokeWidth="8%"
                        strokeDasharray={`${badge.progress * 2.83}, 283`}
                        strokeLinecap="round"
                        transform="rotate(-90, 50, 50)"
                      />
                    </svg>
                  </>
                )}
                
                {/* Badge icon */}
                <div className={`text-3xl mb-2 z-10 ${badge.isCompleted ? 'text-white' : 'text-gray-500'}`}>
                  {badge.icon}
                </div>
                <div className={`font-medium text-center z-10 text-sm ${badge.isCompleted ? 'text-white' : 'text-gray-600'}`}>
                  {badge.name}
                </div>
                
                {/* Hover card with description */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-4 opacity-0 group-hover:opacity-100 flex flex-col justify-center transition-opacity duration-200 shadow-lg">
                  <div className="text-center">
                    <div className={`text-2xl mb-2 inline-block ${badge.isCompleted ? badge.color.split(' ')[1] : 'text-gray-400'}`}>
                      {badge.icon}
                    </div>
                    <div className="font-semibold mb-1">{badge.name}</div>
                    <div className="text-gray-600 text-xs">{badge.description}</div>
                    {badge.progress !== undefined && (
                      <div className="mt-3 w-full bg-gray-200 h-1.5 rounded-full">
                        <div 
                          className={`h-1.5 rounded-full ${badge.isCompleted ? 'bg-green-500' : badge.color.split(' ')[1]}`}
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                        <div className="text-xs mt-1 text-gray-500">{badge.progress}% complete</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
