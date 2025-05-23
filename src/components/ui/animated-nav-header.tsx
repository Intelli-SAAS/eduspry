
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavLink {
  text: string;
  href: string;
}

interface CTAButton {
  text: string;
  href: string;
}

interface AnimatedNavHeaderProps {
  links: NavLink[];
  ctaButtons: {
    primary: CTAButton;
    secondary: CTAButton;
  };
}

export const AnimatedNavHeader: React.FC<AnimatedNavHeaderProps> = ({ links, ctaButtons }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform navbar background opacity based on scroll position
  const navBackgroundOpacity = useTransform(
    scrollY,
    [0, 50],
    [0, 1]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-lg' : 'py-6'
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)'
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-[#1a4480]"
          >
            EduSpry
          </motion.div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link, index) => (
            <Link 
              key={link.href} 
              to={link.href}
              className="text-gray-700 hover:text-[#1a4480] relative font-medium transition-colors"
            >
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative"
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a4480] transition-all duration-300 group-hover:w-full"></span>
              </motion.span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to={ctaButtons.secondary.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-[#1a4480] hover:text-blue-700 font-medium"
            >
              {ctaButtons.secondary.text}
            </motion.button>
          </Link>
          
          <Link to={ctaButtons.primary.href}>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#0d366b' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[#1a4480] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {ctaButtons.primary.text}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
