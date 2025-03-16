import { useLoader } from '@/app/loaderContext';
import { useEffect } from 'react';

/**
 * Hook to control the global loader during API calls or resource loading
 * @param isLoading Boolean indicating if a resource is loading
 * @param dependencies Optional array of dependencies to watch for changes
 */
export function useApiLoader(isLoading: boolean, dependencies: any[] = []) {
  const { setIsLoading } = useLoader();
  
  useEffect(() => {
    setIsLoading(isLoading);
    
    return () => {
      // Ensure we clean up on unmount
      if (isLoading) {
        setIsLoading(false);
      }
    };
  }, [isLoading, setIsLoading, ...dependencies]);
}

/**
 * Utility function to wrap API calls with the loader
 * @param apiCall Function that returns a promise (API call)
 * @param onSuccess Optional callback for successful response
 * @param onError Optional callback for error handling
 */
export async function withLoader<T>(
  apiCall: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: any) => void,
  setIsLoading?: (loading: boolean) => void
): Promise<T | undefined> {
  try {
    if (setIsLoading) setIsLoading(true);
    const response = await apiCall();
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error) {
    if (onError) onError(error);
    return undefined;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}