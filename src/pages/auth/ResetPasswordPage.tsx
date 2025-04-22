import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { ArrowLeft, Check } from 'lucide-react';

// Form validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  // Initialize form
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Extract token from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const resetToken = searchParams.get('token');
    
    if (!resetToken) {
      setIsInvalidToken(true);
      toast({
        title: 'Invalid reset link',
        description: 'The password reset link is invalid or expired.',
        variant: 'destructive',
      });
    } else {
      setToken(resetToken);
    }
  }, [location]);

  // Handle form submission
  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Missing reset token. Please request a new password reset link.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the auth service to reset the password
      await resetPassword(token, values.password);
      
      // Show success message
      setIsSuccess(true);
      
      toast({
        title: 'Password reset successful',
        description: 'Your password has been updated. You can now log in with your new password.',
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: 'Reset failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {isInvalidToken ? (
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-red-100 p-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-red-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Invalid reset link</h2>
              <p className="text-gray-600">
                The password reset link is invalid or has expired. Please request a new one.
              </p>
              <Button 
                className="mt-4 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
                onClick={() => navigate('/forgot-password')}
              >
                Request new link
              </Button>
            </div>
          ) : isSuccess ? (
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Password updated</h2>
              <p className="text-gray-600">
                Your password has been successfully reset. You will be redirected to the login page shortly.
              </p>
              <Button 
                className="mt-4 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
                onClick={() => navigate('/login')}
              >
                Go to login
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
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
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-xs text-gray-500">
                  <p>Your password must have:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>At least 8 characters</li>
                    <li>A mix of letters, numbers, and special characters</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting password...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          )}
        </div>

        <div className="text-center text-sm">
          <Link
            to="/login"
            className="inline-flex items-center font-medium text-[#1a4480] hover:text-[#2c5aa0]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 