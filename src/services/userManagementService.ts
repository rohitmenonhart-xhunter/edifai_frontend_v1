import axios from 'axios';
import { handleApiError } from '@/utils/apiUtils';
import { API_URL } from '@/config/api';

// Fallback API URL in case proxy fails
const FALLBACK_API_URL = 'https://3644-2405-201-e01b-e0b4-6946-b90-4182-ee94.ngrok-free.app';

// Update API URLs to use proxy
const ADMIN_API_URL = `/api/admin`;

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  enrollmentEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  location?: string;
  dateOfBirth?: string;
  phone?: string;
  avatar?: string;
  username?: string;
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

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await makeApiRequest(`${ADMIN_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching users');
  }
};

/**
 * Toggle user enrollment access (admin only)
 */
export const toggleUserEnrollmentAccess = async (userId: string): Promise<User> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await makeApiRequest(
      `${ADMIN_API_URL}/users/${userId}/toggle-enrollment`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      }
    );

    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Error toggling user enrollment access');
  }
};

/**
 * Get user enrollment status (admin only)
 */
export const getUserEnrollmentStatus = async (userId: string): Promise<User> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await makeApiRequest(
      `${ADMIN_API_URL}/users/${userId}/enrollment-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Error getting user enrollment status');
  }
};

export default {
  getAllUsers,
  toggleUserEnrollmentAccess,
  getUserEnrollmentStatus
}; 