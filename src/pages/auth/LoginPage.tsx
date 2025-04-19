
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Spark Hub</h1>
          <p className="mt-2 text-gray-600">Your PUC Exam Preparation Platform</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="mb-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full flex justify-between items-center" 
                  onClick={() => setShowDemoInfo(!showDemoInfo)}
                >
                  <span>Demo Account Information</span>
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </div>
              
              {showDemoInfo && (
                <div className="bg-muted p-4 rounded-md mb-4 text-sm">
                  <h3 className="font-medium mb-2">Available Demo Accounts:</h3>
                  <div className="space-y-3">
                    {demoAccounts.map((account, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{account.role}:</span>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => setDemoAccount(account.email, account.password)}
                          >
                            Use This Account
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <p>Email: {account.email}</p>
                          <p>Password: {account.password}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs mt-2">
                      <strong>College/Institution Code:</strong> puc-demo (for all accounts)
                    </p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="tenantDomain">College/Institution Code</Label>
                <Input
                  id="tenantDomain"
                  name="tenantDomain"
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
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
