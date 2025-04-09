"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Initial app load effect
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 500); // Small delay for smoother transitions
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Navigation change effect (for client-side navigation)
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setTimeout(() => setIsLoading(false), 300);

    // For Next.js route events
    if (typeof window !== 'undefined' && window.next?.router?.events) {
      // @ts-expect-error - Next.js router events
      window.next?.router?.events.on('routeChangeStart', handleStart);
      // @ts-expect-error - Next.js router events
      window.next?.router?.events.on('routeChangeComplete', handleComplete);
      // @ts-expect-error - Next.js router events
      window.next?.router?.events.on('routeChangeError', handleComplete);

      return () => {
        // @ts-expect-error - Next.js router events
        window.next?.router?.events.off('routeChangeStart', handleStart);
        // @ts-expect-error - Next.js router events
        window.next?.router?.events.off('routeChangeComplete', handleComplete);
        // @ts-expect-error - Next.js router events
        window.next?.router?.events.off('routeChangeError', handleComplete);
      };
    }
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};