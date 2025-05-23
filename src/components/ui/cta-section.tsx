
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from './glassmorphic-card';

interface CTAProps {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
}

export const CTASection: React.FC<CTAProps> = ({ 
  title, 
  description, 
  primaryCta, 
  secondaryCta 
}) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GlassmorphicCard className="max-w-4xl mx-auto overflow-hidden">
          <div className="py-12 px-6 sm:px-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              {title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to={primaryCta.link} className="group">
                <button className="px-8 py-4 bg-[#1a4480] text-white rounded-lg font-medium text-lg flex items-center shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                  <span className="relative z-10">{primaryCta.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              
              <Link to={secondaryCta.link}>
                <button className="px-8 py-4 bg-white text-[#1a4480] border border-[#1a4480] rounded-lg font-medium text-lg flex items-center hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1">
                  {secondaryCta.text}
                </button>
              </Link>
            </motion.div>
          </div>
        </GlassmorphicCard>
      </div>
    </section>
  );
};
