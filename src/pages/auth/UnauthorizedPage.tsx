
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ShieldAlert, Home, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';

const UnauthorizedPage: React.FC = () => {
  const { user, logout } = useAuth();
  
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case UserRole.TEACHER:
        return '/teacher/dashboard';
      case UserRole.PRINCIPAL:
        return '/principal/dashboard';
      case UserRole.STUDENT:
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-gray-900">Access Denied</CardTitle>
          <CardDescription className="mt-1 text-gray-600">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm">
            {user ? `You are logged in as ${user.name} with ${user.role} privileges.` : 'You are not currently logged in.'}
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild variant="default">
            <Link to={getDashboardLink()}>
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          
          {user && (
            <Button variant="outline" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
