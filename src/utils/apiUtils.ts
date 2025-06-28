import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

/**
 * Handle API errors in a consistent way
 * @param error The error object from axios
 * @param defaultMessage Default message to show if error doesn't have a response
 * @returns Empty array or object depending on context
 */
export const handleApiError = (error: unknown, defaultMessage: string = 'An error occurred') => {
  console.error('API Error Details:', error);
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Handle specific status codes
    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data as any;
      
      console.log('API Error Response:', {
        status,
        data,
        headers: axiosError.response.headers
      });
      
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
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.log('No response received:', axiosError.request);
      toast.error('Server did not respond. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error setting up request:', axiosError.message);
      toast.error('Network error. Please check your connection.');
    }
  } else if (error instanceof Error) {
    // Handle non-Axios errors
    console.log('Non-Axios error:', error.message);
    toast.error(error.message || defaultMessage);
  } else {
    // Generic error
    toast.error(defaultMessage);
    console.error('Unknown API Error:', error);
  }
  
  // Return empty result based on expected return type context
  return [];
}; 