import axios from 'axios';
import { handleApiError } from '@/utils/apiUtils';
import { API_URL } from '../config/api';

// Fallback API URL in case proxy fails
const FALLBACK_API_URL = 'https://server.edifai.in';

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

// Update API URL to use direct fallback URL
const PROFILE_API_URL = `${FALLBACK_API_URL}/api/users`;

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role?: string;
  username?: string;
  avatar?: string;
  location?: string;
  dateOfBirth?: string;
  phone?: string;
  bio?: string;
}

// Get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(`${PROFILE_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data || {};
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Return a default profile rather than throwing an error
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return {
          _id: userData._id || '',
          name: userData.name || 'Student',
          email: userData.email || '',
          role: userData.role || 'user'
        };
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
    
    return {
      _id: '',
      name: 'Student',
      email: '',
      role: 'user'
    };
  }
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.put(PROFILE_API_URL, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.data;
  } catch (error) {
    throw handleApiError(error, 'Error updating user profile');
  }
};

// Get user schedule events
export const getUserSchedule = async (): Promise<ScheduleEvent[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    
    const response = await axios.get(`${FALLBACK_API_URL}/api/users/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching user schedule:', error);
    return []; // Return empty array on error instead of throwing
  }
};

// Add a schedule event
export const addScheduleEvent = async (eventData: Omit<ScheduleEvent, '_id'>): Promise<ScheduleEvent> => {
  try {
    const response = await axios.post(`${FALLBACK_API_URL}/api/schedule`, eventData);
    return response.data.data;
  } catch (error) {
    console.error('Error adding schedule event:', error);
    throw error;
  }
};

// Update a schedule event
export const updateScheduleEvent = async (eventId: string, eventData: Partial<ScheduleEvent>): Promise<ScheduleEvent> => {
  try {
    const response = await axios.put(`${FALLBACK_API_URL}/api/schedule/${eventId}`, eventData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating schedule event:', error);
    throw error;
  }
};

// Delete a schedule event
export const deleteScheduleEvent = async (eventId: string): Promise<void> => {
  try {
    await axios.delete(`${FALLBACK_API_URL}/api/schedule/${eventId}`);
  } catch (error) {
    console.error('Error deleting schedule event:', error);
    throw error;
  }
};

// Get enrolled courses
export const getEnrolledCourses = async (): Promise<any[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    
    const response = await axios.get(`${FALLBACK_API_URL}/api/courses/enrolled`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    return []; // Return empty array on error instead of throwing
  }
};

// Get user's activity/progress
export const getUserActivity = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(`${FALLBACK_API_URL}/api/users/activity`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data || {
      learningHours: 0,
      certificatesEarned: 0,
      coursesEnrolled: 0,
      progress: 0,
      recentActivity: []
    };
  } catch (error) {
    console.error('Error fetching user activity:', error);
    // Return default values on error
    return {
      learningHours: 0,
      certificatesEarned: 0,
      coursesEnrolled: 0,
      progress: 0,
      recentActivity: []
    };
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
    const response = await axios.put(
      `${FALLBACK_API_URL}/api/courses/${courseId}/progress`, 
      progressData
    );
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

    const response = await axios.post(`${PROFILE_API_URL}/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
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