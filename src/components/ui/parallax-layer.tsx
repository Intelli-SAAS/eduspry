
import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxLayerProps {
  speed: number;
  className?: string;
  children?: React.ReactNode;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  speed, 
  className = "", 
  children 
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 300]);
  
  return (
    <motion.div
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
