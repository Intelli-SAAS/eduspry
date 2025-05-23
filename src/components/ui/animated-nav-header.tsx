
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, X } from 'lucide-react';

interface NavLink {
  text: string;
  href: string;
}

interface AnimatedNavHeaderProps {
  links: NavLink[];
  ctaButtons: {
    primary: NavLink;
    secondary: NavLink;
  };
}

export const AnimatedNavHeader: React.FC<AnimatedNavHeaderProps> = ({ links, ctaButtons }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1a4480] shadow-md py-2' 
          : 'bg-[#1a4480] py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-bold text-white flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              <span>EduSpry</span>
            </Link>
          </motion.div>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-8">
              {links.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <Link 
                    to={item.href} 
                    className="text-white hover:text-blue-200 font-medium relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="flex items-center space-x-4">
              {[ctaButtons.secondary, ctaButtons.primary].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`${
                      index === 0 
                        ? "bg-transparent hover:bg-white/10 border border-white text-white" 
                        : "bg-white text-[#1a4480] hover:bg-blue-50"
                    } px-6 py-2 rounded-md font-medium`}
                    asChild
                  >
                    <Link to={item.href}>{item.text}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {links.map((item) => (
              <Link 
                key={item.text}
                to={item.href} 
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to={ctaButtons.secondary.href}
                className="text-center border border-white text-white py-2 rounded-md hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaButtons.secondary.text}
              </Link>
              <Link 
                to={ctaButtons.primary.href}
                className="text-center bg-white text-[#1a4480] py-2 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaButtons.primary.text}
              </Link>
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};
