import axios from 'axios';
import { handleApiError } from '@/utils/apiUtils';

// Update API URL to use proxy
const AUTH_API_URL = `/api/auth`;

// Fallback API URL in case proxy fails
const FALLBACK_API_URL = 'https://server.edifai.in';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Helper function to handle API request with fallback
const makeApiRequest = async (url: string, options: any = {}) => {
  try {
    // First try with proxy
    return await axios(url, options);
  } catch (error: any) {
    // If we get HTML instead of JSON, try the fallback URL
    if (error.response && typeof error.response.data === 'string' && 
        error.response.data.includes('<!DOCTYPE html>')) {
      console.log('Received HTML response, trying fallback URL');
      const fallbackUrl = `${FALLBACK_API_URL}${url}`;
      return await axios(fallbackUrl, options);
    }
    throw error;
  }
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await makeApiRequest(AUTH_API_URL + '/login', {
      method: 'POST',
      data: credentials
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Login failed');
  }
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await makeApiRequest(AUTH_API_URL + '/register', {
      method: 'POST',
      data: userData
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Registration failed');
  }
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await makeApiRequest(AUTH_API_URL + '/forgot-password', {
      method: 'POST',
      data: { email }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to send password reset email');
  }
};

export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
  try {
    const response = await makeApiRequest(AUTH_API_URL + '/reset-password', {
      method: 'POST',
      data: { token, password }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to reset password');
  }
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await makeApiRequest(AUTH_API_URL + '/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyToken,
  logout,
  isAuthenticated
}; 