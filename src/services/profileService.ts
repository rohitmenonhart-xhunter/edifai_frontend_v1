import axios from 'axios';
import { handleApiError } from '@/utils/apiUtils';
import { API_URL } from '../config/api';

// Fallback API URL in case proxy fails
const FALLBACK_API_URL = 'https://3644-2405-201-e01b-e0b4-6946-b90-4182-ee94.ngrok-free.app';

// Type definitions
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  learningHours: number;
  certificatesEarned: number;
  coursesEnrolled: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  // Additional profile fields
  avatar?: string;
  location?: string;
  dateOfBirth?: string;
  phone?: string;
  username?: string;
}

export interface ScheduleEvent {
  _id: string;
  title: string;
  dueDate: string;
  time: string;
  description: string;
  color: string;
  userId: string;
}

// Update API URL to use proxy
const PROFILE_API_URL = `/api/users/profile`;

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  location?: string;
  dateOfBirth?: string;
  phone?: string;
  bio?: string;
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

// Get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await makeApiRequest(PROFILE_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Error fetching user profile');
  }
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await makeApiRequest(PROFILE_API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: profileData
    });

    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Error updating user profile');
  }
};

// Get user schedule events
export const getUserSchedule = async (): Promise<ScheduleEvent[]> => {
  try {
    const response = await makeApiRequest('/api/schedule');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user schedule:', error);
    throw error;
  }
};

// Add a schedule event
export const addScheduleEvent = async (eventData: Omit<ScheduleEvent, '_id'>): Promise<ScheduleEvent> => {
  try {
    const response = await makeApiRequest('/api/schedule', {
      method: 'POST',
      data: eventData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error adding schedule event:', error);
    throw error;
  }
};

// Update a schedule event
export const updateScheduleEvent = async (eventId: string, eventData: Partial<ScheduleEvent>): Promise<ScheduleEvent> => {
  try {
    const response = await makeApiRequest(`/api/schedule/${eventId}`, {
      method: 'PUT',
      data: eventData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating schedule event:', error);
    throw error;
  }
};

// Delete a schedule event
export const deleteScheduleEvent = async (eventId: string): Promise<void> => {
  try {
    await makeApiRequest(`/api/schedule/${eventId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting schedule event:', error);
    throw error;
  }
};

// Get enrolled courses
export const getEnrolledCourses = async (): Promise<any[]> => {
  try {
    const response = await makeApiRequest('/api/courses/enrolled');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

// Get user's activity/progress
export const getUserActivity = async (): Promise<any> => {
  try {
    const response = await makeApiRequest('/api/profile/activity');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};

// Update course progress
export const updateCourseProgress = async (
  courseId: string, 
  progressData: { 
    progress?: number; 
    currentLesson?: number;
    completed?: boolean;
  }
): Promise<any> => {
  try {
    const response = await makeApiRequest(`/api/courses/${courseId}/progress`, {
      method: 'PUT',
      data: progressData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (file: File): Promise<{ avatar: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const formData = new FormData();
    formData.append('avatar', file);

    const response = await makeApiRequest(`${PROFILE_API_URL}/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });

    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Error uploading profile picture');
  }
};

export default {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture
}; 