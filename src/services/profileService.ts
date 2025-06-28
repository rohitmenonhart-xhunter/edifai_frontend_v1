import api from '../lib/api';
import { API_URL } from '../config/api';

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

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put('/api/auth/profile', userData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get user schedule events
export const getUserSchedule = async (): Promise<ScheduleEvent[]> => {
  try {
    const response = await api.get('/api/schedule');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user schedule:', error);
    throw error;
  }
};

// Add a schedule event
export const addScheduleEvent = async (eventData: Omit<ScheduleEvent, '_id'>): Promise<ScheduleEvent> => {
  try {
    const response = await api.post('/api/schedule', eventData);
    return response.data.data;
  } catch (error) {
    console.error('Error adding schedule event:', error);
    throw error;
  }
};

// Update a schedule event
export const updateScheduleEvent = async (eventId: string, eventData: Partial<ScheduleEvent>): Promise<ScheduleEvent> => {
  try {
    const response = await api.put(`/api/schedule/${eventId}`, eventData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating schedule event:', error);
    throw error;
  }
};

// Delete a schedule event
export const deleteScheduleEvent = async (eventId: string): Promise<void> => {
  try {
    await api.delete(`/api/schedule/${eventId}`);
  } catch (error) {
    console.error('Error deleting schedule event:', error);
    throw error;
  }
};

// Get enrolled courses
export const getEnrolledCourses = async (): Promise<any[]> => {
  try {
    const response = await api.get('/api/courses/enrolled');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

// Get user's activity/progress
export const getUserActivity = async (): Promise<any> => {
  try {
    const response = await api.get('/api/profile/activity');
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
    const response = await api.put(`/api/courses/${courseId}/progress`, progressData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
}; 