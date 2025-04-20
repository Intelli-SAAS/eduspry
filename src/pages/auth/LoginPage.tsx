
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            EduSpry
          </h1>
          <p className="text-base text-gray-600">
            The Competitive Edge for Curious Minds
          </p>
        </div>
        
        <Card className="glass-card border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Access your personalized learning dashboard
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-slide-up">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full flex justify-between items-center hover:bg-gray-50" 
                  onClick={() => setShowDemoInfo(!showDemoInfo)}
                >
                  <span>Demo Account Information</span>
                  <InfoIcon className="h-4 w-4" />
                </Button>

                {showDemoInfo && (
                  <div className="bg-blue-50/50 p-4 rounded-lg space-y-3 animate-slide-up">
                    {demoAccounts.map((account, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{account.role}:</span>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => setDemoAccount(account.email, account.password)}
                            className="bg-white hover:bg-gray-50"
                          >
                            Use This Account
                          </Button>
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
                  <Label htmlFor="tenantDomain">College/Institution Code</Label>
                  <Input
                    id="tenantDomain"
                    name="tenantDomain"
                    className="perplexity-input"
                    placeholder="your-college-code"
                    required
                    value={formData.tenantDomain}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="perplexity-input"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/90">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="perplexity-input"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full perplexity-button"
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
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
