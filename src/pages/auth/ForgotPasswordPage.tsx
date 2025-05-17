import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Mail, Sparkles, Lock, Info } from 'lucide-react';
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

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await requestPasswordReset(email);
      setIsSuccess(true);
      toast({
        title: 'Email Sent',
        description: 'Check your inbox for instructions to reset your password.',
      });
    } catch (err) {
      console.error('Password reset request error:', err);
      setError('Failed to send reset email. Please try again.');
      toast({
        title: 'Request Failed',
        description: 'Unable to send reset instructions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center p-4">
      {/* Enhanced background with education and AI themed elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/5 to-white pointer-events-none overflow-hidden">
        {/* Subtle dots pattern */}
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

        {/* Digital dots and lines pattern */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={`line-${index}`}
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
              Reset Your Password
            </span>
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={14} className="text-[#1a4480]" />
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
                {isSuccess ? "Check Your Email" : "Forgot Password?"}
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                {isSuccess
                  ? "We've sent recovery instructions to your email"
                  : "Enter your email address to recover your account"
                }
              </CardDescription>
            </CardHeader>

            {isSuccess ? (
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 shadow-inner">
                    <Mail size={36} className="text-[#1a4480]" />
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    We've sent an email to <span className="font-semibold text-[#1a4480]">{email}</span> with instructions to reset your password.
                  </p>
                  <div className="pt-2 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-[#1a4480]/20 hover:bg-[#1a4480]/5 text-[#1a4480]"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send to a different email
                    </Button>
                  </div>
                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                    <p className="text-xs text-[#1a4480]/80 flex items-start">
                      <Info size={14} className="mr-2 flex-shrink-0 mt-0.5" />
                      Check your spam folder if you don't see the email in your inbox within a few minutes.
                    </p>
                  </div>
                </div>
              </CardContent>
            ) : (
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

                  <div className="flex justify-center mb-2">
                    <div className="w-20 h-20 rounded-full bg-blue-50 shadow-inner flex items-center justify-center">
                      <Lock size={36} className="text-[#1a4480]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-center text-gray-600 text-sm">
                      Enter your email address below and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="email" className="text-[#1a4480] font-medium">Email Address</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/40">
                        <Mail size={16} />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 bg-white/70 backdrop-blur-sm border-[#1a4480]/20 focus:border-[#1a4480] focus:ring-[#1a4480]/20 transition-all duration-300"
                        autoComplete="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                    <p className="text-xs text-[#1a4480]/80 flex items-start">
                      <Info size={14} className="mr-2 flex-shrink-0 mt-0.5" />
                      Can't access your email? Please contact your school administrator for assistance.
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pb-4">
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
                          Sending...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            )}
          </Card>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-500 mt-2"
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
              <ArrowLeft size={14} className="mr-1" />
              Back to Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 