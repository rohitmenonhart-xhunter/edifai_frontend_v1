import axios from 'axios';
import { handleApiError } from '@/utils/apiUtils';

// Update API URL to use proxy
const AUTH_API_URL = `/api/auth`;

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

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Login failed');
  }
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Registration failed');
  }
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to send password reset email');
  }
};

export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/reset-password`, { token, password });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to reset password');
  }
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await axios.get(`${AUTH_API_URL}/verify`, {
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

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyToken,
  logout
}; 