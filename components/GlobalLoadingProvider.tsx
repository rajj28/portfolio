"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import OfflineScreen from "./OfflineScreen";
import { AnimatePresence } from "framer-motion";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isOffline: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
  isOffline: false,
});

export const useLoading = () => useContext(LoadingContext);

export default function GlobalLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // Detect online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Set initial state
    setIsOffline(!navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Initial page load
  useEffect(() => {
    // Show loading on first mount
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500); // Show loading for 1.5 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  // Route change loading
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Show loading for 800ms on route changes

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, isOffline }}>
      <AnimatePresence mode="wait">
        {isOffline ? (
          <OfflineScreen key="offline" />
        ) : (isLoading || isInitialLoad) ? (
          <LoadingScreen key="loading" message={isInitialLoad ? "Welcome!" : "Loading..."} />
        ) : null}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
}

