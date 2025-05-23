
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  link: string;
}

interface LearningPathProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

export const LearningPath: React.FC<LearningPathProps> = ({ title, subtitle, steps }) => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider text-blue-600 mb-2">{subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline connector */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
            >
              <div className="flex md:block">
                <div className="flex items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-500 transform md:-translate-x-1/2 z-10"></div>
                </div>
                
                {/* Content card */}
                <div className={`ml-12 md:ml-0 bg-white rounded-lg shadow-md p-6 md:w-full ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <Link to={step.link}>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
