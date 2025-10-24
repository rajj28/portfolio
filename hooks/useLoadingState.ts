import { useLoading } from "@/components/GlobalLoadingProvider";

/**
 * Custom hook for manual loading state control
 * Use this when you want to show loading during async operations
 */
export function useLoadingState() {
  const { isLoading, setIsLoading } = useLoading();

  const withLoading = async <T,>(
    asyncFn: () => Promise<T>,
    minDuration = 500
  ): Promise<T> => {
    setIsLoading(true);
    const start = Date.now();

    try {
      const result = await asyncFn();
      const elapsed = Date.now() - start;
      
      // Ensure minimum loading duration for UX
      if (elapsed < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
      }

      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setIsLoading,
    withLoading,
  };
}

