import api from '../lib/api';

// Interface for user data
export interface UserData {
  name?: string;
  email: string;
  password: string;
}

// Authentication service
const authService = {
  // Register new user
  async register(userData: UserData): Promise<any> {
    const response = await api.post('/api/auth/register', userData);
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },
  
  // Login user
  async login(userData: { email: string; password: string }): Promise<any> {
    try {
      console.log("Sending login request to:", '/api/auth/login');
      console.log("With credentials:", { email: userData.email, passwordLength: userData.password.length });
      
      const response = await api.post('/api/auth/login', userData);
      
      console.log("Login response received:", response.data);
      
      if (response.data.success && response.data.token) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      console.error("Login request error:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      throw error;
    }
  },
  
  // Logout user
  async logout(): Promise<void> {
    await api.get('/api/auth/logout');
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
  },
  
  // Get current user
  async getCurrentUser(): Promise<any> {
    const response = await api.get('/api/auth/me');
    
    return response.data;
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  },
  
  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
};

export default authService; 