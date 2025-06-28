import authService from '@/services/authService';

/**
 * Checks if the current user has admin privileges
 * @returns A promise resolving to true if user is an admin, false otherwise
 */
export const checkIsAdmin = async (): Promise<boolean> => {
  try {
    const userData = await authService.getCurrentUser();
    return userData?.data?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}; 