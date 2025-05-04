"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of the user object (adjust as needed)
interface User {
  id: string;
  username: string;
  role: 'buyer' | 'seller' | 'admin';
}

interface AppContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: User['role'] | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load theme and user from localStorage on initial mount (client-side only)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const storedUser = localStorage.getItem('user');

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
       // Check system preference if no theme is stored
       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
       const initialTheme = prefersDark ? 'dark' : 'light';
       setTheme(initialTheme);
       localStorage.setItem('theme', initialTheme);
       document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage and DOM when theme changes
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  }, []);

  // Authentication functions
  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    // Optionally redirect to login or home page
    // router.push('/login');
  }, []);

  const isAuthenticated = !!user;
  const userRole = user?.role ?? null;

  // Prevent rendering children until initialization is complete to avoid hydration issues
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, login, logout, isAuthenticated, userRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
