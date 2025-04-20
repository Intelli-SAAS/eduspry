
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant, AuthState, LoginCredentials, AuthResponse, UserRole } from '@/types';
import { api } from '@/lib/api';
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  checkPermission: (requiredRoles: UserRole[]) => boolean;
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

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
  checkPermission: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if we're in development or if API is unavailable
      // Use mock authentication data
      const mockUser = MOCK_USERS[credentials.email];
      
      if (mockUser && 
          mockUser.password === credentials.password && 
          mockUser.tenant.domain === credentials.tenantDomain) {
        
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

  const logout = () => {
    // Clear state and localStorage
    setAuthState(defaultAuthState);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
    toast.info("You have been logged out");
  };

  // Helper function to check if current user has required role
  const checkPermission = (requiredRoles: UserRole[]) => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }
    
    return requiredRoles.includes(authState.user.role);
  };

  const value = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    tenant: authState.tenant,
    token: authState.token,
    login,
    logout,
    isLoading,
    error,
    checkPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
