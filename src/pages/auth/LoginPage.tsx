import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, InfoIcon } from 'lucide-react';
import { UserRole } from '@/types';
// import { motion } from 'framer-motion';

/*
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};
*/

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
      await login(formData);
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
    <div className="min-h-screen bg-gradient-to-br from-[#e6ebf2] via-white to-[#e6ebf2] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a4480] to-[#4d7cc7] shadow-lg hover:scale-105 transition-transform">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            EduSpry
          </h1>
          <p className="text-base text-gray-600">
            The Competitive Edge for Curious Minds
          </p>
        </div>
        
        <div>
          <Card className="border-0 shadow-md hover:translate-y-[-5px] transition-transform duration-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-[#1a4480]">Sign in</CardTitle>
              <CardDescription className="text-center">
                Access your personalized learning dashboard
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="animate-fade-in">
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex justify-between items-center hover:bg-[#f0f4f9] text-[#1a4480] border-[#1a4480]" 
                      onClick={() => setShowDemoInfo(!showDemoInfo)}
                    >
                      <span>Demo Account Information</span>
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  {showDemoInfo && (
                    <div className="bg-[#f0f4f9] p-4 rounded-lg space-y-3 animate-fade-in">
                      {demoAccounts.map((account, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{account.role}:</span>
                            <div className="hover:scale-105 active:scale-95 transition-transform">
                              <Button 
                                type="button" 
                                variant="secondary" 
                                size="sm" 
                                onClick={() => setDemoAccount(account.email, account.password)}
                                className="bg-white hover:bg-gray-50 text-[#1a4480]"
                              >
                                Use This Account
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>Email: {account.email}</p>
                            <p>Password: {account.password}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="tenantDomain" className="text-[#1a4480]">College/Institution Code</Label>
                    <Input
                      id="tenantDomain"
                      name="tenantDomain"
                      className="border-[#1a4480]/30 focus:border-[#1a4480] focus:ring-[#1a4480]/20"
                      placeholder="your-college-code"
                      required
                      value={formData.tenantDomain}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1a4480]">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="border-[#1a4480]/30 focus:border-[#1a4480] focus:ring-[#1a4480]/20"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-[#1a4480]">Password</Label>
                      <a 
                        href="#" 
                        className="text-sm font-medium text-[#1a4480] hover:text-[#142f59] hover:translate-x-1 transition-transform"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="border-[#1a4480]/30 focus:border-[#1a4480] focus:ring-[#1a4480]/20"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <div className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  <Button
                    type="submit"
                    className="w-full bg-[#1a4480] hover:bg-[#142f59] text-white"
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
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
