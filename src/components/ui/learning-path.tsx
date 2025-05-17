
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  link: string;
}

interface LearningPathProps {
  title: string;
  subtitle: string;
  steps: LearningStep[];
}

export const LearningPath: React.FC<LearningPathProps> = ({ title, subtitle, steps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1 bg-[#1a4480]/10 rounded-full"
          >
            <span className="text-sm font-semibold text-[#1a4480]">
              {subtitle}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
          >
            {title}
          </motion.h2>
          
          <motion.div 
            initial={{ width: "0%" }}
            animate={isInView ? { width: "150px" } : { width: "0%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-[#1a4480] to-[#3c71c7] rounded-full mx-auto mt-4 mb-10"
          />
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Connector line */}
          <div className="absolute h-full top-0 left-[15px] lg:left-[50%] lg:-ml-[1px] w-[2px] bg-gray-200" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className={`relative mb-12 lg:mb-16 ${index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:ml-auto'}`}
            >
              <div className={`flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                <div 
                  className={`relative z-10 bg-white border-2 max-w-md ${
                    step.completed 
                      ? 'border-green-500 text-green-700' 
                      : 'border-[#1a4480] text-[#1a4480]'
                  } p-4 lg:p-6 rounded-lg shadow-md`}
                >
                  <div className="absolute top-[15px] left-[-35px] lg:left-auto lg:top-[21px] lg:translate-y-0 lg:translate-x-1/2
                    w-8 h-8 rounded-full flex items-center justify-center
                    bg-white border-2 z-20
                    ${index % 2 === 0 ? 'lg:right-[-35px]' : 'lg:left-[-35px]'}
                    ${step.completed ? 'border-green-500 text-green-500' : 'border-[#1a4480] text-[#1a4480]'}">
                    {step.completed ? <Check className="w-4 h-4" /> : (index + 1)}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${step.completed ? 'text-gray-900' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <Link 
                    to={step.link}
                    className={`inline-flex items-center text-sm font-medium ${
                      step.completed ? 'text-green-600' : 'text-[#1a4480]'
                    } hover:underline`}
                  >
                    {step.completed ? 'Review Path' : 'Continue Learning'}
                    <ArrowRight className="ml-1 w-4 h-4" />
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
