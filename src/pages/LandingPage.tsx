import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Lightbulb, Award, ChevronRight, Star, BookOpen, User, School, Database, Shield, Zap, LineChart, Bell, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Common background component to be used across sections
const EducationAIBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Neural network pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="neural-network" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="#1a4480" />
        <circle cx="40" cy="40" r="1.5" fill="#1a4480" />
        <circle cx="40" cy="10" r="1.5" fill="#1a4480" />
        <circle cx="10" cy="40" r="1.5" fill="#1a4480" />
        <line x1="10" y1="10" x2="40" y2="40" stroke="#1a4480" strokeWidth="0.5" />
        <line x1="40" y1="10" x2="10" y2="40" stroke="#1a4480" strokeWidth="0.5" />
        <line x1="10" y1="10" x2="40" y2="10" stroke="#1a4480" strokeWidth="0.5" />
        <line x1="10" y1="40" x2="40" y2="40" stroke="#1a4480" strokeWidth="0.5" />
        <line x1="10" y1="10" x2="10" y2="40" stroke="#1a4480" strokeWidth="0.5" />
        <line x1="40" y1="10" x2="40" y2="40" stroke="#1a4480" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#neural-network)" />
    </svg>

    {/* Digital circuit pattern at the bottom */}
    <svg className="absolute bottom-0 left-0 w-full h-[30%] opacity-[0.07]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,160 L40,160 L40,140 L80,140 L80,180 L120,180 L120,140 L200,140 L200,160 L280,160 L280,120 L360,120 L360,180 L440,180 L440,120 L520,120 L520,160 L600,160 L600,140 L680,140 L680,180 L760,180 L760,140 L840,140 L840,160 L920,160 L920,120 L1000,120 L1000,180 L1080,180 L1080,120 L1160,120 L1160,160 L1240,160 L1240,140 L1320,140 L1320,180 L1400,180 L1400,140 L1440,140 L1440,320 L0,320 Z"
        fill="none" stroke="#1a4480" strokeWidth="2" />
      <circle cx="40" cy="160" r="4" fill="#2c5aa0" />
      <circle cx="80" cy="140" r="4" fill="#2c5aa0" />
      <circle cx="120" cy="180" r="4" fill="#2c5aa0" />
      <circle cx="200" cy="140" r="4" fill="#2c5aa0" />
      <circle cx="280" cy="160" r="4" fill="#2c5aa0" />
      <circle cx="360" cy="120" r="4" fill="#2c5aa0" />
      <circle cx="440" cy="180" r="4" fill="#2c5aa0" />
      <circle cx="520" cy="120" r="4" fill="#2c5aa0" />
      <circle cx="600" cy="160" r="4" fill="#2c5aa0" />
      <circle cx="680" cy="140" r="4" fill="#2c5aa0" />
      <circle cx="760" cy="180" r="4" fill="#2c5aa0" />
      <circle cx="840" cy="140" r="4" fill="#2c5aa0" />
      <circle cx="920" cy="160" r="4" fill="#2c5aa0" />
      <circle cx="1000" cy="120" r="4" fill="#2c5aa0" />
      <circle cx="1080" cy="180" r="4" fill="#2c5aa0" />
      <circle cx="1160" cy="120" r="4" fill="#2c5aa0" />
      <circle cx="1240" cy="160" r="4" fill="#2c5aa0" />
      <circle cx="1320" cy="140" r="4" fill="#2c5aa0" />
      <circle cx="1400" cy="180" r="4" fill="#2c5aa0" />
    </svg>

    {/* Educational symbols */}
    <div className="absolute top-[10%] right-[10%] w-[180px] h-[180px] opacity-[0.06]">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" fill="#1a4480" />
        <path d="M12 3L1 9L12 15L23 9L12 3Z" stroke="#1a4480" strokeWidth="1" />
      </svg>
    </div>

    {/* Lightbulb - representing ideas and learning */}
    <div className="absolute bottom-[20%] left-[15%] w-[150px] h-[150px] opacity-[0.06]">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM14.85 13.1L14 13.7V16H10V13.7L9.15 13.1C7.8 12.16 7 10.63 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 10.63 16.2 12.16 14.85 13.1Z" fill="#3c71c7" />
      </svg>
    </div>

    <div className="absolute top-[40%] left-[10%] w-[100px] h-[100px] opacity-[0.05]">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" fill="#2c5aa0" />
      </svg>
    </div>

    {/* Books icon - representing education and knowledge */}
    <div className="absolute top-[60%] right-[12%] w-[120px] h-[120px] opacity-[0.05]">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="#1a4480" />
      </svg>
    </div>

    {/* AI Brain concept */}
    <div className="absolute top-[30%] right-[30%] w-[250px] h-[250px] opacity-[0.04]">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1a4480" d="M208 348.5c0 38.5 13.3 67.2 32 85.1V256c-18.7 17.9-32 46.5-32 92.5zm96 85.1c18.7-17.9 32-46.5 32-85.1 0-38.5-13.3-67.2-32-85.1v170.2z" />
        <path fill="#1a4480" d="M442 303.5c0-89.1-83.3-132.5-166-132.5-88.7 0-158-43.4-158-132.5H78c0 118.1 85.3 182.5 198 182.5 30.7 0 61.3 4.2 89.2 14.5 28.7 10.6 53.3 27 68.2 50.4 8.3 13 12.5 27.1 12.5 42.1 0 42.1-32.3 76.5-74.5 76.5h-10.3c-6.9 24.6-26.8 43.6-52.6 47L303 488c47.5 16 112.2-16 138.2-47 24.2-28.8 30.6-53.9 30.6-82 0-21.1-5.8-40-14.4-55.8-3.4 2.9-6.9 5.6-10.3 8.3-6.1 19.4-16 41.7-38.9 41.7H387c-14.8 0-26.8-12-26.8-26.8 0-14.8 12-26.8 26.8-26.8h21.1c22.9 0 32.8 22.3 38.9 41.7 13.3-10.2 24.2-22.5 33.2-37.6H387c-32.2 0-58.3 26.1-58.3 58.3s26.1 58.3 58.3 58.3h21.1c27 0 46.8-9.3 61.3-22.5-7.4 27.4-27.6 55.2-67.4 55.2-29.2 0-61.3-14.8-61.3 26.8 0 32.2-26.1 58.3-58.3 58.3s-58.3-26.1-58.3-58.3c0-25.4 16.1-47 38.9-55.3l5.5-31.4c-45 8.1-79.3 47.7-79.3 94.9 0 53 43 96 96 96s96-43 96-96c0-10.3-1.6-20.2-4.6-29.5 88.4-4.9 126.7-63.3 126.7-138.1 0-32.8-12.8-57.3-22.4-77.1z" />
      </svg>
    </div>

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

    {/* Graph/chart element - representing data analysis and learning metrics */}
    <div className="absolute bottom-[52%] right-[40%] opacity-[0.05]">
      <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="70" x2="110" y2="70" stroke="#1a4480" strokeWidth="2" />
        <line x1="10" y1="10" x2="10" y2="70" stroke="#1a4480" strokeWidth="2" />
        <polyline points="10,50 30,45 50,55 70,30 90,35 110,20" fill="none" stroke="#2c5aa0" strokeWidth="2" />
        <circle cx="30" cy="45" r="3" fill="#3c71c7" />
        <circle cx="50" cy="55" r="3" fill="#3c71c7" />
        <circle cx="70" cy="30" r="3" fill="#3c71c7" />
        <circle cx="90" cy="35" r="3" fill="#3c71c7" />
        <circle cx="110" cy="20" r="3" fill="#3c71c7" />
      </svg>
    </div>

    {/* Quantum computing element */}
    <div className="absolute top-[12%] left-[40%] opacity-[0.04]">
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#1a4480" strokeWidth="1" strokeDasharray="5,5" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="#2c5aa0" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="60" cy="60" r="20" fill="none" stroke="#3c71c7" strokeWidth="1" />
        <circle cx="60" cy="25" r="4" fill="#1a4480" />
        <circle cx="60" cy="95" r="4" fill="#1a4480" />
        <circle cx="25" cy="60" r="4" fill="#2c5aa0" />
        <circle cx="95" cy="60" r="4" fill="#2c5aa0" />
        <circle cx="40" cy="40" r="3" fill="#3c71c7" />
        <circle cx="80" cy="40" r="3" fill="#3c71c7" />
        <circle cx="40" cy="80" r="3" fill="#3c71c7" />
        <circle cx="80" cy="80" r="3" fill="#3c71c7" />
        <line x1="60" y1="25" x2="60" y2="95" stroke="#1a4480" strokeWidth="1" />
        <line x1="25" y1="60" x2="95" y2="60" stroke="#2c5aa0" strokeWidth="1" />
        <line x1="40" y1="40" x2="80" y2="80" stroke="#3c71c7" strokeWidth="1" />
        <line x1="40" y1="80" x2="80" y2="40" stroke="#3c71c7" strokeWidth="1" />
      </svg>
    </div>

    {/* Digital matrix rain effect */}
    <div className="absolute inset-0">
      {Array.from({ length: 25 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
          style={{
            height: `${Math.random() * 15 + 10}%`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            y: [0, 100],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <header className="bg-[#1a4480] shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">EduSpry</Link>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/features" className="text-white hover:text-blue-200 font-medium">Features</Link>
                <Link to="/pricing" className="text-white hover:text-blue-200 font-medium">Pricing</Link>
                <Link to="/about" className="text-white hover:text-blue-200 font-medium">About</Link>
                <Link to="/contact" className="text-white hover:text-blue-200 font-medium">Contact</Link>
              </nav>
              <Button
                className="bg-white text-[#1a4480] hover:bg-blue-50 px-6 py-2 rounded-md font-medium"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="bg-white text-[#1a4480] hover:bg-blue-50 px-6 py-2 rounded-md font-medium"
                asChild
              >
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with subtle pattern and gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] bg-grid-white/[0.05] bg-[length:16px_16px]"></div>

        {/* Accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400"></div>

        {/* Content */}
        <div className="container relative mx-auto px-6 py-24 md:py-32">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              Transform Your Education <br className="hidden md:block" />
              <span className="text-blue-200">With AI-Powered Learning</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-3xl mb-8"
              variants={itemVariants}
            >
              EduSpry helps teachers create engaging content, students learn more effectively,
              and institutions track performance - all through an intuitive, AI-enhanced platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
              variants={itemVariants}
            >
              <Button
                className="bg-white text-[#1a4480] hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-semibold"
                asChild
              >
                <Link to="/demo">Watch Demo <ChevronRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Straight divider */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50"></div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50 relative">
        <EducationAIBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <img src="/brands/harvard.svg" alt="Harvard" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/stanford.svg" alt="Stanford" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/mit.svg" alt="MIT" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/oxford.svg" alt="Oxford" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/cambridge.svg" alt="Cambridge" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
        <EducationAIBackground />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxYTQ0ODAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0yNCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1 bg-[#1a4480]/10 rounded-full"
            >
              <span className="text-sm font-semibold text-[#1a4480]">
                Powerful Platform Features
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
            >
              Advanced Educational Tools
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how our comprehensive suite of tools empowers the entire educational ecosystem
            </motion.p>
          </div>
        </div>

        {/* Custom horizontal scroll section */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

          {/* Scroll container */}
          <motion.div
            className="flex gap-6 py-8 px-10 overflow-x-auto hide-scrollbar"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ paddingLeft: 'calc(50% - 500px)', paddingRight: '120px' }}
          >
            {/* Feature cards */}
            {[
              {
                title: "Live Interactive Classes",
                description: "Engage in real-time with students through interactive virtual classrooms with whiteboard and screen sharing",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='20' y='20' width='300' height='160' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Crect x='30' y='30' width='180' height='110' rx='4' fill='%23dbeafe'/%3E%3Ccircle cx='120' cy='85' r='25' fill='%231a4480' opacity='0.8'/%3E%3Crect x='220' y='30' width='90' height='140' rx='4' fill='%23f0f9ff'/%3E%3Crect x='230' y='40' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='230' y='65' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='230' y='90' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='230' y='115' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Cpath d='M120 70 L135 95 L105 95 Z' fill='white'/%3E%3C/svg%3E",
                color: "from-blue-50 to-indigo-50",
                icon: <Users className="h-6 w-6 text-[#1a4480]" />,
              },
              {
                title: "AI-Powered Course Creation",
                description: "Create comprehensive courses with intelligent content suggestions and automated resource generation",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='40' y='30' width='260' height='140' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Crect x='50' y='50' width='80' height='100' rx='4' fill='%23dbeafe'/%3E%3Crect x='140' y='50' width='80' height='100' rx='4' fill='%23dbeafe'/%3E%3Crect x='230' y='50' width='60' height='100' rx='4' fill='%23dbeafe'/%3E%3Cpath d='M60 140 L120 140 L120 90 L90 70 L60 90 Z' fill='%231a4480' opacity='0.2'/%3E%3Cpath d='M150 140 L210 140 L210 90 L180 70 L150 90 Z' fill='%231a4480' opacity='0.7'/%3E%3Cpath d='M240 140 L280 140 L280 90 L260 70 L240 90 Z' fill='%231a4480' opacity='0.4'/%3E%3Crect x='65' y='60' width='50' height='6' rx='2' fill='%231a4480' opacity='0.7'/%3E%3Crect x='155' y='60' width='50' height='6' rx='2' fill='white'/%3E%3Crect x='240' y='60' width='40' height='6' rx='2' fill='%231a4480' opacity='0.7'/%3E%3C/svg%3E",
                color: "from-purple-50 to-indigo-50",
                icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
              },
              {
                title: "Secure Proctored Exams",
                description: "Conduct secure, AI-monitored assessments with automated identity verification and anti-cheating measures",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='40' y='40' width='260' height='120' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Crect x='60' y='60' width='160' height='80' rx='4' fill='%23dbeafe'/%3E%3Crect x='230' y='60' width='50' height='80' rx='4' fill='%23f0f9ff'/%3E%3Ccircle cx='140' cy='100' r='30' fill='%231a4480' opacity='0.7'/%3E%3Cpath d='M140 85 L140 105 L155 95 Z' fill='white'/%3E%3Crect x='235' y='70' width='40' height='10' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='235' y='90' width='40' height='10' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='235' y='110' width='40' height='10' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Cpath d='M40 40 L60 20 L300 20 L280 40 Z' fill='%231a4480' opacity='0.1'/%3E%3Cpath d='M300 160 L280 180 L40 180 L60 160 Z' fill='%231a4480' opacity='0.1'/%3E%3C/svg%3E",
                color: "from-green-50 to-emerald-50",
                icon: <Shield className="h-6 w-6 text-green-600" />,
              },
              {
                title: "AI Doubts Solver",
                description: "Instant resolution of student questions with context-aware AI that understands complex educational concepts",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='20' y='40' width='300' height='120' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Cpath d='M80 70 L120 70 A15 15 0 0 1 120 100 L80 100 Z' fill='%23dbeafe'/%3E%3Cpath d='M220 110 L260 110 A15 15 0 0 0 260 80 L220 80 Z' fill='%231a4480' opacity='0.1'/%3E%3Cpath d='M160 50 L180 50 A10 10 0 0 1 180 70 L160 70 Z' fill='%231a4480' opacity='0.3'/%3E%3Ccircle cx='70' cy='130' r='10' fill='%23dbeafe'/%3E%3Ccircle cx='270' cy='60' r='10' fill='%231a4480' opacity='0.1'/%3E%3Ccircle cx='170' cy='90' r='20' fill='%231a4480' opacity='0.7'/%3E%3Cpath d='M170 83 L177 90 L170 97 L163 90 Z' fill='white'/%3E%3C/svg%3E",
                color: "from-blue-50 to-cyan-50",
                icon: <Zap className="h-6 w-6 text-blue-600" />,
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 w-[340px] bg-gradient-to-br ${feature.color} rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow`}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="h-[200px] w-full bg-white relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] hover:from-[#0f2b50] hover:to-[#1a4480] text-white shadow-xl">
              <span className="flex items-center gap-2">
                Explore All Features
                <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <EducationAIBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduSpry?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to transform every aspect of educational experience
              with innovative AI-powered tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Generated Content</h3>
              <p className="text-gray-600 mb-4">
                Create lesson plans, tests, quizzes and flashcards in seconds with our advanced AI assistance.
              </p>
              <ul className="space-y-2">
                {['Test generators', 'Lesson planners', 'Flashcard creators'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Engagement</h3>
              <p className="text-gray-600 mb-4">
                Boost student engagement with interactive learning tools and personalized content.
              </p>
              <ul className="space-y-2">
                {['Voice assistant', 'Doubt solving', 'Interactive quizzes'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track student performance with detailed analytics and actionable insights.
              </p>
              <ul className="space-y-2">
                {['Performance dashboards', 'Progress tracking', 'Personalized recommendations'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 relative">
        <EducationAIBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from educators and students who've transformed their learning experience with EduSpry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "EduSpry has completely transformed how I create lesson plans. What used to take hours now takes minutes, and the quality is better!",
                name: "Dr. Sarah Johnson",
                role: "High School Science Teacher",
                rating: 5
              },
              {
                quote: "As a principal, I need insights into how our students are performing. The analytics tools provide exactly what I need to make informed decisions.",
                name: "Michael Chen",
                role: "School Principal",
                rating: 5
              },
              {
                quote: "The AI tutor helped me understand complex topics in a way that made sense to me. My grades have improved significantly!",
                name: "Emma Rodriguez",
                role: "University Student",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative">
        <EducationAIBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] rounded-2xl overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>

            <div className="relative py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Educational Experience?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Join thousands of educators and students who are already benefiting from EduSpry's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-white text-[#1a4480] hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link to="/register">Start Your Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-semibold"
                  asChild
                >
                  <Link to="/contact">Contact Sales <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with extra background wrapper */}
      <div style={{ backgroundColor: '#1a4480' }}>
        <footer
          className="pt-12 pb-8 relative overflow-hidden"
          style={{ backgroundColor: '#1a4480', position: 'relative', zIndex: 1 }}
        >
          <div className="absolute inset-0 bg-[#1a4480] -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4 lg:col-span-5">
                <div className="pr-8">
                  <motion.div
                    className="flex items-center mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookOpen className="h-8 w-8 text-white" />
                    <span className="ml-2 text-xl font-bold text-white">EduSpry</span>
                  </motion.div>

                  <p className="text-blue-100 text-base mb-8 opacity-80">
                    Transforming education through intelligent analytics, AI-powered insights, and comprehensive management tools for educational institutions worldwide.
                  </p>

                  <div className="flex space-x-4">
                    {/* Social icons */}
                    {[
                      { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></motion.svg>, ariaLabel: "Facebook" },
                      { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></motion.svg>, ariaLabel: "Twitter" },
                      { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></motion.svg>, ariaLabel: "LinkedIn" },
                      { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></motion.svg>, ariaLabel: "Instagram" }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.ariaLabel}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-8 lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
                      <span className="w-5 h-0.5 bg-blue-300 mr-2"></span>
                      Solutions
                    </h3>
                    <ul className="space-y-3">
                      {['For Students', 'For Teachers', 'For Administrators', 'For Parents'].map((item, i) => (
                        <motion.li key={i}>
                          <motion.a
                            href="#"
                            className="text-blue-100 hover:text-white flex items-center"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                            <span>{item}</span>
                          </motion.a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
                      <span className="w-5 h-0.5 bg-blue-300 mr-2"></span>
                      Resources
                    </h3>
                    <ul className="space-y-3">
                      {['Documentation', 'Guides', 'API Status', 'Help Center', 'Community'].map((item, i) => (
                        <motion.li key={i}>
                          <motion.a
                            href="#"
                            className="text-blue-100 hover:text-white flex items-center"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                            <span>{item}</span>
                          </motion.a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
                      <span className="w-5 h-0.5 bg-blue-300 mr-2"></span>
                      Company
                    </h3>
                    <ul className="space-y-3">
                      {['About', 'Blog', 'Careers', 'Press', 'Contact', 'Partners'].map((item, i) => (
                        <motion.li key={i}>
                          <motion.a
                            href="#"
                            className="text-blue-100 hover:text-white flex items-center"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                            <span>{item}</span>
                          </motion.a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-blue-200/80 text-sm">
                  &copy; {new Date().getFullYear()} EduSpry. All rights reserved.
                </p>

                <div className="flex space-x-6 mt-4 md:mt-0">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="text-blue-200/80 text-sm hover:text-white"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
