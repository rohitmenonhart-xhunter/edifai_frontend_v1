// Auth utilities for consistent authentication across service calls

/**
 * Gets the authentication header for API requests
 * @returns The authorization header containing the JWT token
 */
export const getAuthHeader = async (): Promise<{ Authorization?: string }> => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  
  return {};
}; 