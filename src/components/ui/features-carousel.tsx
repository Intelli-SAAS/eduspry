
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CarouselFeature {
  title: string;
  description: string;
  image?: string;
  color: string;
  icon: React.ReactNode;
}

interface FeaturesCarouselProps {
  title: string;
  subtitle: string;
  features: CarouselFeature[];
}

export const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({ title, subtitle, features }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setIsMobile(window.innerWidth < 768);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const nextSlide = () => {
    setDirection('next');
    setActiveIndex((current) => (current + 1) % features.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setActiveIndex((current) => (current - 1 + features.length) % features.length);
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider text-blue-600 mb-2">{subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
        </div>
        
        <div className="relative" ref={containerRef}>
          {!isMobile ? (
            // Desktop view - show all slides in a row
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-b ${feature.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full`}
                >
                  <div className="flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 flex-grow">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            // Mobile view - carousel
            <>
              <div className="flex overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ x: -activeIndex * containerWidth }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex"
                >
                  {features.map((feature, idx) => (
                    <motion.div
                      key={feature.title}
                      className={`min-w-[${containerWidth}px] p-4`}
                    >
                      <div className={`bg-gradient-to-b ${feature.color} rounded-xl p-6 shadow-md`}>
                        <div className="flex items-center justify-center mb-6">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                        <p className="text-gray-700">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="flex justify-center mt-6 gap-2">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={prevSlide} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  &larr;
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  &rarr;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
