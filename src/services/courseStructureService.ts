import axios from 'axios';

interface Section {
  id: string;
  title: string;
  content: string;
  generatedContent?: string;
}

interface Subchapter {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  subchapters: Subchapter[];
}

interface CourseStructure {
  chapters: Chapter[];
}

// Replace process.env with import.meta.env for Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const courseStructureService = {
  // Get course structure
  getCourseStructure: async (courseId: string): Promise<CourseStructure> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await axios.get(`${API_URL}/api/courses/${courseId}/structure`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check response structure and extract data
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      } else {
        console.error('Unexpected API response format:', response.data);
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching course structure:', error);
      throw error;
    }
  },

  // Save course structure
  saveCourseStructure: async (courseId: string, structure: CourseStructure): Promise<CourseStructure> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await axios.post(
        `${API_URL}/api/courses/${courseId}/structure`, 
        structure,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error saving course structure:', error);
      throw error;
    }
  },

  // Preview AI-generated content
  previewAIContent: async (courseId: string, section: Section): Promise<{ content: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await axios.post(
        `${API_URL}/api/admin/courses/preview-content`,
        { courseId, sectionTitle: section.title, content: section.content },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error previewing AI content:', error);
      throw error;
    }
  },

  // Generate course content
  generateCourseContent: async (courseId: string, structure: CourseStructure): Promise<CourseStructure> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await axios.post(
        `${API_URL}/api/admin/courses/${courseId}/generate-all-content`,
        structure,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating course content:', error);
      throw error;
    }
  }
};

export default courseStructureService;
export type { CourseStructure, Chapter, Subchapter, Section }; 