
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveDeviceMockup: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience the Platform</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern interface designed for educators and students alike, accessible on any device
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="relative z-20"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Device frame */}
            <div className="bg-gray-800 rounded-[2.5rem] p-3 shadow-xl transform perspective-1200 rotate-y-0 hover:rotate-y-10 transition-transform duration-700">
              {/* Screen */}
              <div className="relative bg-blue-50 aspect-[16/10] rounded-[2rem] overflow-hidden">
                {/* Screen content */}
                <div className="absolute inset-0 p-4">
                  <div className="bg-white h-full rounded-lg shadow-md overflow-hidden">
                    {/* Fake header */}
                    <div className="h-16 bg-[#1a4480] flex items-center px-6">
                      <div className="text-white font-semibold">EduSpry Dashboard</div>
                      <div className="ml-auto flex space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Fake content */}
                    <div className="grid grid-cols-3 gap-4 p-6">
                      <div className="col-span-2 space-y-4">
                        <div className="h-24 bg-blue-50 rounded-lg"></div>
                        <div className="h-48 bg-gray-50 rounded-lg"></div>
                        <div className="h-12 bg-blue-50 rounded-lg"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-32 bg-blue-50 rounded-lg"></div>
                        <div className="h-56 bg-gray-50 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reflection */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-200 to-transparent opacity-30"></div>
          </motion.div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute top-10 right-10 w-24 h-24 bg-blue-500 rounded-xl z-10"
            animate={{
              y: isHovered ? [-10, 10] : 0,
              rotate: isHovered ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
          />
          
          <motion.div 
            className="absolute bottom-20 left-10 w-16 h-16 bg-indigo-500 rounded-full z-10"
            animate={{
              y: isHovered ? [10, -10] : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ duration: 2.5, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  );
};
