
import React from 'react';
import { motion } from 'framer-motion';

interface Badge {
  id: string;
  title: string;
  image: string;
  color: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
  title?: string;
  subtitle?: string;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badges, 
  title = "Achievements", 
  subtitle = "Earn badges as you progress"
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
              className="flex flex-col items-center"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${badge.color}`}>
                <img 
                  src={badge.image} 
                  alt={badge.title} 
                  className="w-12 h-12" 
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-900">{badge.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
