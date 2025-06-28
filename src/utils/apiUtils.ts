import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

/**
 * Handle API errors in a consistent way
 * @param error The error object from axios
 * @param defaultMessage Default message to show if error doesn't have a response
 * @returns Empty array or object depending on context
 */
export const handleApiError = (error: unknown, defaultMessage: string = 'An error occurred') => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Handle specific status codes
    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data as any;
      
      // Show error message from API if available
      const message = data?.message || defaultMessage;
      
      // Handle different status codes
      if (status === 401) {
        toast.error('Authentication error. Please login again.');
        // Redirect to login page or refresh token
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else {
        toast.error(message);
      }
    } else {
      // Network error or request cancelled
      toast.error('Network error. Please check your connection.');
    }
  } else {
    // Generic error
    toast.error(defaultMessage);
    console.error('API Error:', error);
  }
  
  // Return empty result based on expected return type context
  return [];
}; 