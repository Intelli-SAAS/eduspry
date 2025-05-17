import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@/types';

// Form validation schema
const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
  role: z.enum([UserRole.STUDENT, UserRole.TEACHER, UserRole.PRINCIPAL]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

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

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: UserRole.STUDENT,
    },
  });

  // Handle form submission
  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      toast({
        title: 'Account created successfully',
        description: 'You can now set up your account',
      });

      // Redirect to onboarding flow instead of login
      navigate('/onboarding/type');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center p-4">
      {/* Enhanced background with education and AI themed elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-100/15 to-white pointer-events-none overflow-hidden">
        {/* Subtle dots pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.09]" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1a4480" />
            <circle cx="15" cy="15" r="1" fill="#2c5aa0" />
            <circle cx="28" cy="28" r="1" fill="#3c71c7" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>

        {/* Scattered small elegant shapes with gradients */}
        {Array.from({ length: 15 }).map((_, index) => (
          <svg
            key={`shape-${index}`}
            className="absolute opacity-[0.12]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              transform: `rotate(${Math.random() * 45}deg) scale(${0.8 + Math.random() * 1})`,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a4480" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3c71c7" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id={`radial-${index}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#3c71c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a4480" stopOpacity="0.9" />
              </radialGradient>
            </defs>
            {/* Render different shapes based on index */}
            {index % 5 === 0 && <circle cx="6" cy="6" r="3" fill={`url(#radial-${index})`} />}
            {index % 5 === 1 && <rect x="2" y="2" width="8" height="8" rx="1" fill={`url(#gradient-${index})`} />}
            {index % 5 === 2 && <polygon points="6,1 11,6 6,11 1,6" fill={`url(#gradient-${index})`} />}
            {index % 5 === 3 && <circle cx="6" cy="6" r="5" strokeWidth="0.8" stroke="#1a4480" fill="none" />}
            {index % 5 === 4 && <path d="M1,6 C1,3 3,1 6,1 C9,1 11,3 11,6 C11,9 9,11 6,11 C3,11 1,9 1,6 Z" fill="none" stroke="#3c71c7" strokeWidth="0.8" />}
          </svg>
        ))}

        {/* Subtle waves with gradient */}
        <svg className="absolute top-[20%] right-[15%] w-[150px] h-[80px] opacity-[0.09]" viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a4480" />
              <stop offset="50%" stopColor="#3c71c7" />
              <stop offset="100%" stopColor="#1a4480" />
            </linearGradient>
          </defs>
          <path d="M0,40 C30,20 60,60 90,40 C120,20 150,60 180,40" stroke="url(#wave-gradient)" strokeWidth="1.2" fill="none" />
          <path d="M0,60 C30,40 60,80 90,60 C120,40 150,80 180,60" stroke="url(#wave-gradient)" strokeWidth="1.2" fill="none" />
          <path d="M0,20 C30,0 60,40 90,20 C120,0 150,40 180,20" stroke="url(#wave-gradient)" strokeWidth="1.2" fill="none" />
        </svg>

        {/* Small triangles pattern with gradient */}
        <svg className="absolute bottom-[15%] left-[10%] w-[80px] h-[80px] opacity-[0.09]" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="triangle-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a4480" />
              <stop offset="100%" stopColor="#2c5aa0" />
            </linearGradient>
            <linearGradient id="triangle-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c5aa0" />
              <stop offset="100%" stopColor="#3c71c7" />
            </linearGradient>
          </defs>
          <polygon points="10,10 20,25 0,25" fill="url(#triangle-gradient-1)" />
          <polygon points="40,10 50,25 30,25" fill="url(#triangle-gradient-2)" />
          <polygon points="70,10 80,25 60,25" fill="url(#triangle-gradient-1)" />
          <polygon points="25,35 35,50 15,50" fill="url(#triangle-gradient-2)" />
          <polygon points="55,35 65,50 45,50" fill="url(#triangle-gradient-1)" />
          <polygon points="10,60 20,75 0,75" fill="url(#triangle-gradient-2)" />
          <polygon points="40,60 50,75 30,75" fill="url(#triangle-gradient-1)" />
          <polygon points="70,60 80,75 60,75" fill="url(#triangle-gradient-2)" />
        </svg>

        {/* Educational icon: graduation cap with gradient */}
        <div className="absolute top-[60%] right-[20%] w-[80px] h-[80px] opacity-[0.12]">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a4480" />
                <stop offset="100%" stopColor="#3c71c7" />
              </linearGradient>
            </defs>
            <path d="M12 2L0 9L12 16L22 10.09V17.5H24V9L12 2Z" fill="url(#cap-gradient)" />
            <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 16L5 13.18Z" fill="#3c71c7" opacity="0.8" />
          </svg>
        </div>

        {/* Educational icon: open book with gradient */}
        <div className="absolute top-[30%] left-[15%] w-[70px] h-[70px] opacity-[0.12]">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="book-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a4480" />
                <stop offset="100%" stopColor="#3c71c7" />
              </linearGradient>
            </defs>
            <path d="M12 6.5C10 4.5 7 4.5 4 6V19C7 17.5 10 17.5 12 19.5M12 6.5C14 4.5 17 4.5 20 6V19C17 17.5 14 17.5 12 19.5M12 6.5V19.5" stroke="url(#book-gradient)" strokeWidth="2" />
          </svg>
        </div>

        {/* Circular rings with gradient */}
        <svg className="absolute top-[40%] right-[30%] w-[100px] h-[100px] opacity-[0.09]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a4480" />
              <stop offset="33%" stopColor="#2c5aa0" />
              <stop offset="66%" stopColor="#3c71c7" />
              <stop offset="100%" stopColor="#1a4480" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#circle-gradient)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="url(#circle-gradient)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="url(#circle-gradient)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="url(#circle-gradient)" strokeWidth="0.8" />
        </svg>

        {/* Digital dots and lines pattern with enhanced gradient */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={`line-${index}`}
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent"
              style={{
                height: `${Math.random() * 12 + 8}%`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                y: [0, 50],
                opacity: [0, 0.5, 0],
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
            <GraduationCap className="h-9 w-9 text-white" />
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create Your Account
          </motion.h1>

          <motion.p
            className="text-gray-600"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className="rounded-lg border border-blue-100/20 bg-white/90 backdrop-blur-sm p-6 shadow-xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1a4480] font-medium">First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <Input
                              placeholder="John"
                              {...field}
                              className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1a4480] font-medium">Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1a4480] font-medium">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <Input
                            placeholder="johndoe@example.com"
                            type="email"
                            {...field}
                            className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1a4480] font-medium">I am a</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                          <SelectItem value={UserRole.TEACHER}>Teacher</SelectItem>
                          <SelectItem value={UserRole.PRINCIPAL}>School Principal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1a4480] font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            {...field}
                            className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1a4480] font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            {...field}
                            className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] hover:from-[#153864] hover:to-[#224a87] py-6 shadow-md hover:shadow-lg transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </motion.div>

        <motion.div
          className="text-center text-sm"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-[#1a4480] hover:text-[#2c5aa0]"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage; 