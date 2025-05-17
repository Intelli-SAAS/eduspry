
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  subtitle,
  testimonials
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* DNA helix structure - representing learning pathways */}
        <div className="absolute top-[55%] left-[28%] opacity-[0.04]">
          <svg width="180" height="300" viewBox="0 0 180 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M40,20 C90,40 90,80 140,100 C90,120 90,160 40,180 C90,200 90,240 140,260"
              stroke="#1a4480" strokeWidth="3" fill="none" />
            <path d="M140,20 C90,40 90,80 40,100 C90,120 90,160 140,180 C90,200 90,240 40,260"
              stroke="#2c5aa0" strokeWidth="3" fill="none" />
            {/* DNA rungs */}
            <line x1="40" y1="20" x2="140" y2="20" stroke="#3c71c7" strokeWidth="2" />
            <line x1="57.5" y1="40" x2="122.5" y2="40" stroke="#3c71c7" strokeWidth="2" />
            <line x1="75" y1="60" x2="105" y2="60" stroke="#3c71c7" strokeWidth="2" />
            <line x1="57.5" y1="80" x2="122.5" y2="80" stroke="#3c71c7" strokeWidth="2" />
            <line x1="40" y1="100" x2="140" y2="100" stroke="#3c71c7" strokeWidth="2" />
            <line x1="57.5" y1="120" x2="122.5" y2="120" stroke="#3c71c7" strokeWidth="2" />
            <line x1="75" y1="140" x2="105" y2="140" stroke="#3c71c7" strokeWidth="2" />
            <line x1="57.5" y1="160" x2="122.5" y2="160" stroke="#3c71c7" strokeWidth="2" />
            <line x1="40" y1="180" x2="140" y2="180" stroke="#3c71c7" strokeWidth="2" />
            <line x1="57.5" y1="200" x2="122.5" y2="200" stroke="#3c71c7" strokeWidth="2" />
            <line x1="75" y1="220" x2="105" y2="220" stroke="#3c71c7" strokeWidth="2" />
            <line x1="57.5" y1="240" x2="122.5" y2="240" stroke="#3c71c7" strokeWidth="2" />
            <line x1="40" y1="260" x2="140" y2="260" stroke="#3c71c7" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Binary code element - representing digital learning */}
        <div className="absolute bottom-[35%] right-[20%] opacity-[0.04]">
          <svg width="180" height="120" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="12" fill="#1a4480" fontSize="12" fontFamily="monospace">01001101 01000001 01010100 01001000</text>
            <text x="0" y="30" fill="#1a4480" fontSize="12" fontFamily="monospace">01010011 01000011 01001001 01000101</text>
            <text x="0" y="48" fill="#1a4480" fontSize="12" fontFamily="monospace">01000001 01001001 01001100 01000101</text>
            <text x="0" y="66" fill="#1a4480" fontSize="12" fontFamily="monospace">01000011 01001111 01000100 01000101</text>
            <text x="0" y="84" fill="#1a4480" fontSize="12" fontFamily="monospace">01001100 01000101 01000001 01010010</text>
            <text x="0" y="102" fill="#1a4480" fontSize="12" fontFamily="monospace">01000001 01001001 01000101 01000100</text>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
          >
            {title}
          </motion.h2>

          <motion.div 
            initial={{ width: "0%" }}
            animate={isInView ? { width: "150px" } : { width: "0%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-[#1a4480] to-[#3c71c7] rounded-full mx-auto mt-4"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              {/* Decorative quotation mark */}
              <div className="absolute -top-4 -left-4 text-8xl text-gray-100 font-serif z-0">
                "
              </div>
              
              <div className="relative z-10">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
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
