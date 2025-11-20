'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiRequest from '../utils/api';

export type UserRole = 'waiter' | 'cashier' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  businessName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  businessName?: string;
  businessType?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // TODO: Wire to real /auth/login endpoint similar to signup
      await new Promise(resolve => setTimeout(resolve, 500));

      const userData: User = {
        id: `user-${Date.now()}`,
        email,
        firstName: 'John',
        lastName: 'Doe',
        role,
        businessName: 'RestroSphere Demo',
      };

      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', `token-${Date.now()}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      const response = await apiRequest<{
        message: string;
        token: string;
        user: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          role: UserRole;
          businessName?: string;
        };
      }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const newUser: User = {
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role,
        businessName: response.user.businessName,
      };

      setUser(newUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('authToken', response.token);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


