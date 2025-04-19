
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link to={user ? '/dashboard' : '/login'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {user ? 'Return to Dashboard' : 'Return to Login'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
