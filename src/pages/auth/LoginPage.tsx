import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, InfoIcon, Sparkles } from 'lucide-react';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseAnimation = {
  initial: { scale: 1, opacity: 0.7 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    tenantDomain: 'puc-demo',
  });

  const [showDemoInfo, setShowDemoInfo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in the auth context
      console.error('Login error:', err);
    }
  };

  const demoAccounts = [
    { role: UserRole.STUDENT, email: 'student@test.com', password: 'StudentPass123!' },
    { role: UserRole.TEACHER, email: 'teacher@test.com', password: 'TeacherPass123!' },
    { role: UserRole.PRINCIPAL, email: 'principal@test.com', password: 'PrincipalPass123!' },
  ];

  const setDemoAccount = (email: string, password: string) => {
    setFormData({
      ...formData,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center p-4">
      {/* Enhanced background with education and AI themed elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/5 to-white pointer-events-none overflow-hidden">
        {/* Education and AI themed background elements */}
        <div className="absolute inset-0">
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

          {/* Replace heart with lightbulb - representing ideas and learning */}
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

          {/* Add books icon - representing education and knowledge */}
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
        </div>

        {/* Enhance digital matrix rain effect with more elements */}
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

      <div className="w-full max-w-md space-y-8 z-10">
        <motion.div
          className="text-center space-y-2"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a4480] to-[#4d7cc7] shadow-lg"
            whileHover={{ scale: 1.1, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BookOpen className="h-9 w-9 text-white" />
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            EduSpry
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              The Competitive Edge for Curious Minds
            </span>
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#1a4480]" />
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border border-blue-100/20 shadow-xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]" style={{ fontFamily: "'Playfair Display', serif" }}>Sign in</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Access your personalized learning dashboard
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex justify-between items-center bg-gradient-to-r hover:bg-gradient-to-br from-[#f0f4f9] to-[#f5f9ff] text-[#1a4480] border-[#1a4480]/20"
                      onClick={() => setShowDemoInfo(!showDemoInfo)}
                    >
                      <span>Demo Account Information</span>
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </motion.div>

                  {showDemoInfo && (
                    <motion.div
                      className="bg-gradient-to-r from-[#f0f4f9] to-[#f5f9ff] p-4 rounded-lg space-y-3 border border-blue-100/50"
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {demoAccounts.map((account, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-[#1a4480]">{account.role}:</span>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => setDemoAccount(account.email, account.password)}
                                className="bg-white hover:bg-gradient-to-r from-[#1a4480]/5 to-[#4d7cc7]/5 text-[#1a4480] shadow-sm"
                              >
                                Use This Account
                              </Button>
                            </motion.div>
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>Email: {account.email}</p>
                            <p>Password: {account.password}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="tenantDomain" className="text-[#1a4480] font-medium">College/Institution Code</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <Input
                        id="tenantDomain"
                        name="tenantDomain"
                        className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                        placeholder="your-college-code"
                        required
                        value={formData.tenantDomain}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="email" className="text-[#1a4480] font-medium">Email</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                        autoComplete="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-[#1a4480] font-medium">Password</Label>
                      <motion.a
                        href="/forgot-password"
                        className="text-sm font-medium text-[#1a4480] hover:text-[#142f59]"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        Forgot password?
                      </motion.a>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>
                </div>
              </CardContent>

              <CardFooter>
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] hover:from-[#0f2b50] hover:to-[#1a4480] text-white shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-500 mt-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <span>Don't have an account?</span>{" "}
          <motion.a
            href="/register"
            className="font-medium text-[#1a4480] hover:text-[#142f59]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Register here
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
