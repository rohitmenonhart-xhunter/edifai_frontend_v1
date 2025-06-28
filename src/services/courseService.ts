import axios from 'axios';
import { getAuthHeader } from '@/utils/authUtils';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

// Fallback API URL in case proxy fails
const FALLBACK_API_URL = 'https://3644-2405-201-e01b-e0b4-6946-b90-4182-ee94.ngrok-free.app';

// Course interfaces
export interface ICourse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  instructor: any;
  price: number;
  discount?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  lessons: ILesson[];
  enrolledUsers: string[];
  rating: number;
  reviews: IReview[];
  discountedPrice?: number;
}

export interface ILesson {
  _id: string;
  title: string;
  content: string;
  duration: number;
  order: number;
  videoUrl?: string;
  resources?: { title: string; url: string }[];
}

export interface IReview {
  user: any;
  rating: number;
  comment: string;
  createdAt: string;
}

// Mentor interfaces
export interface IMentor {
  _id: string;
  name: string;
  bio: string;
  avatar: string;
  expertise: string[];
  rating: number;
  courseCount: number;
  studentCount: number;
}

// API endpoints - using the imported API_URL
const API_ENDPOINT = `/api/courses`;
const MENTORS_ENDPOINT = `/api/mentors`;

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

// Get all courses
export const getCourses = async (): Promise<ICourse[]> => {
  try {
    console.log("Attempting to fetch courses from:", API_ENDPOINT);
    const headers = await getAuthHeader();
    
    const response = await makeApiRequest(API_ENDPOINT, { 
      headers,
      timeout: 10000 // 10 second timeout
    });
    
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    
    // Check if it's a network error
    if (error.message === 'Network Error') {
      toast.error('Cannot connect to server. Please check your internet connection.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Server may be down or unreachable.');
    } else if (error.response) {
      toast.error(`Server error: ${error.response.status}. Please try again later.`);
    } else if (error.request) {
      toast.error('No response from server. Please try again later.');
    }
    
    return [];
  }
};

// Get course by id
export const getCourseById = async (id: string): Promise<ICourse> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(`${API_ENDPOINT}/${id}`, { headers });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (courseData: Partial<ICourse>): Promise<ICourse> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(API_ENDPOINT, {
      method: 'POST',
      headers,
      data: courseData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Update a course
export const updateCourse = async (id: string, courseData: Partial<ICourse>): Promise<ICourse> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(`${API_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers,
      data: courseData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (id: string): Promise<void> => {
  try {
    const headers = await getAuthHeader();
    await makeApiRequest(`${API_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Enroll in a course
export const enrollInCourse = async (courseId: string): Promise<ICourse> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(`${API_ENDPOINT}/${courseId}/enroll`, {
      method: 'PUT',
      headers,
      data: {}
    });
    return response.data.data;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

// Add a review to a course
export const addCourseReview = async (courseId: string, rating: number, comment: string): Promise<ICourse> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(`${API_ENDPOINT}/${courseId}/reviews`, {
      method: 'POST',
      headers,
      data: { rating, comment }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error adding course review:', error);
    throw error;
  }
};

// Get all mentors
export const getMentors = async (): Promise<IMentor[]> => {
  try {
    console.log("Attempting to fetch mentors from:", MENTORS_ENDPOINT);
    const headers = await getAuthHeader();
    console.log("Using headers:", headers);
    
    const response = await makeApiRequest(MENTORS_ENDPOINT, { 
      headers,
      timeout: 10000 // 10 second timeout
    });
    
    console.log("Mentors API response:", response.status, response.data);
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error fetching mentors:', error);
    
    // Check if it's a network error
    if (error.message === 'Network Error') {
      console.error('Network connectivity issue detected');
      toast.error('Cannot connect to server. Please check your internet connection.');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      toast.error('Request timed out. Server may be down or unreachable.');
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error:', error.response.status, error.response.data);
      toast.error(`Server error: ${error.response.status}. Please try again later.`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
      toast.error('No response from server. Please try again later.');
    }
    
    return [];
  }
};

// Get mentor by id
export const getMentorById = async (id: string): Promise<IMentor> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(`${MENTORS_ENDPOINT}/${id}`, { headers });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching mentor details:', error);
    throw error;
  }
};

// Get mentor courses
export const getMentorCourses = async (mentorId: string): Promise<ICourse[]> => {
  try {
    const headers = await getAuthHeader();
    const response = await makeApiRequest(`${MENTORS_ENDPOINT}/${mentorId}/courses`, { headers });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching mentor courses:', error);
    throw error;
  }
};

// Create default export with all functions
const courseService = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  addCourseReview,
  getMentors,
  getMentorById,
  getMentorCourses
};

export default courseService; 