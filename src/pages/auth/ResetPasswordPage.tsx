import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Lock, Sparkles, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();

  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get token from URL query parameter
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('No reset token found. Please request a new password reset link.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await resetPassword(token, password);
      setIsSuccess(true);
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been updated. You can now log in with your new password.',
      });

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Failed to reset password. The token may be invalid or expired.');
      toast({
        title: 'Reset Failed',
        description: 'Unable to reset your password. Please try again or request a new reset link.',
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
              Reset Your Password
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
              <CardTitle className="text-2xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {isSuccess ? 'Password Reset Complete' : 'Create New Password'}
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                {isSuccess
                  ? "Your password has been successfully reset"
                  : "Enter your new password below"
                }
              </CardDescription>
            </CardHeader>

            {isSuccess ? (
              <CardContent className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center space-y-4 p-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <p className="text-center text-sm text-gray-600 max-w-xs">
                    Your password has been successfully reset. You will be redirected to the login page shortly.
                  </p>
                </div>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 py-4">
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

                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="password" className="text-[#1a4480] font-medium">New Password</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                        placeholder="••••••••"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="confirmPassword" className="text-[#1a4480] font-medium">Confirm Password</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </motion.div>
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
                      disabled={isLoading || !token}
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Resetting...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            )}
          </Card>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-500 mt-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center justify-center space-x-1 font-medium text-[#1a4480] hover:text-[#142f59]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/login" className="flex items-center">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back to Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 