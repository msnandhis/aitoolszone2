import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static user for development
const STATIC_USER: User = {
  id: '1',
  email: 'admin@hello.com',
  role: 'admin'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For development, just check if credentials match static ones
    if (email === 'a@a.a' && password === 'a') {
      localStorage.setItem('auth_user', JSON.stringify(STATIC_USER));
      setUser(STATIC_USER);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
