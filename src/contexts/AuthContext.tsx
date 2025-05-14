import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Tenant, AuthState, LoginCredentials, AuthResponse, UserRole } from '@/types';
import { api } from '@/lib/api';
import { toast } from "@/components/ui/sonner";

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tenant: Tenant | null;
  error: string | null;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  
  // Permissions
  checkPermission: (roles: UserRole[]) => boolean;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  tenant: null,
  token: null,
};

// Mock user data for development
const MOCK_USERS = {
  'student@test.com': {
    user: {
      id: '1',
      tenantId: '1',
      email: 'student@test.com',
      firstName: 'Test',
      lastName: 'Student',
      role: UserRole.STUDENT,
      avatar: null,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      className: '12th Science',
      section: 'A',
      phoneNumber: '123-456-7890'
    },
    tenant: {
      id: '1',
      name: 'Demo PU College',
      domain: 'puc-demo',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      settings: {
        allowRegistration: true,
        features: {
          analytics: true,
          fileUploads: true,
          questionBank: true,
          antiCheating: false
        }
      }
    },
    password: 'StudentPass123!',
    token: 'mock-token-student',
    refreshToken: 'mock-refresh-token-student',
  },
  'teacher@test.com': {
    user: {
      id: '2',
      tenantId: '1',
      email: 'teacher@test.com',
      firstName: 'Test',
      lastName: 'Teacher',
      role: UserRole.TEACHER,
      avatar: null,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      phoneNumber: '123-456-7891',
      subjects: ['Physics', 'Chemistry']
    },
    tenant: {
      id: '1',
      name: 'Demo PU College',
      domain: 'puc-demo',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      settings: {
        allowRegistration: true,
        features: {
          analytics: true,
          fileUploads: true,
          questionBank: true,
          antiCheating: false
        }
      }
    },
    password: 'TeacherPass123!',
    token: 'mock-token-teacher',
    refreshToken: 'mock-refresh-token-teacher',
  },
  'principal@test.com': {
    user: {
      id: '3',
      tenantId: '1',
      email: 'principal@test.com',
      firstName: 'Test',
      lastName: 'Principal',
      role: UserRole.PRINCIPAL,
      avatar: null,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      phoneNumber: '123-456-7892'
    },
    tenant: {
      id: '1',
      name: 'Demo PU College',
      domain: 'puc-demo',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      settings: {
        allowRegistration: true,
        features: {
          analytics: true,
          fileUploads: true,
          questionBank: true,
          antiCheating: false
        }
      }
    },
    password: 'PrincipalPass123!',
    token: 'mock-token-principal',
    refreshToken: 'mock-refresh-token-principal',
  },
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedTenant = localStorage.getItem('tenant');
        
        if (storedToken && storedUser && storedTenant) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(storedUser),
            tenant: JSON.parse(storedTenant),
            token: storedToken,
          });
        }
      } catch (err) {
        console.error('Failed to restore authentication state:', err);
        // Clear potentially corrupted auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tenant');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set authorization header for all requests when token changes
  useEffect(() => {
    if (authState.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [authState.token]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if we're in development or if API is unavailable
      // Use mock authentication data
      const mockUser = MOCK_USERS[email];
      
      if (mockUser && mockUser.password === password) {
        // Successfully authenticated with mock data
        const { user, tenant, token, refreshToken } = mockUser;
        
        // Save to state and localStorage
        const newAuthState = {
          isAuthenticated: true,
          user,
          tenant,
          token,
        };

        setAuthState(newAuthState);
        
        // Persist to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tenant', JSON.stringify(tenant));
        
        toast.success("Login successful", {
          description: `Welcome back, ${user.firstName} ${user.lastName}!`
        });
      } else {
        // Mock authentication failed
        setError('Login failed. Please check your credentials.');
        toast.error("Login failed", {
          description: "Please check your credentials and try again."
        });
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear state and localStorage
    setAuthState(defaultAuthState);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
    toast.info("You have been logged out");
  };

  // Register function
  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
  }) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just create a user without actually storing it
      // In a real app, you would create the user in your database
      
      // We don't auto-login after registration to force email verification
      // in a real application
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset function
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to send a reset email
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just pretend we sent an email
      console.log(`Password reset requested for: ${email}`);
    } catch (error) {
      console.error('Password reset request error:', error);
      throw new Error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to verify the token and set the new password
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just pretend we reset the password
      console.log(`Password reset with token: ${token}`);
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has required role
  const checkPermission = (roles: UserRole[]) => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }
    return roles.includes(authState.user.role);
  };

  const value = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    tenant: authState.tenant,
    error,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    checkPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
