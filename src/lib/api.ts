
import axios from 'axios';

// Create axios instance with default config
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for handling tenant context
api.interceptors.request.use(
  (config) => {
    // Add tenant domain to requests if available
    const tenant = localStorage.getItem('tenant');
    if (tenant) {
      const parsedTenant = JSON.parse(tenant);
      config.headers['X-Tenant-Domain'] = parsedTenant.domain;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // No refresh token available, logout
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('tenant');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Request new token
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/auth/refresh`,
          { refreshToken }
        );

        if (response.data.token) {
          // Update tokens
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          
          // Update auth header and retry original request
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear auth data and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('tenant');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string; tenantDomain: string }) => 
      api.post('/api/auth/login', credentials),
    register: (userData: any) => api.post('/api/auth/register', userData),
    refreshToken: (refreshToken: string) => api.post('/api/auth/refresh', { refreshToken }),
    getCurrentUser: () => api.get('/api/auth/me'),
  },
  
  // Question endpoints
  questions: {
    getAll: (params?: any) => api.get('/api/questions', { params }),
    getById: (id: string) => api.get(`/api/questions/${id}`),
    create: (questionData: any) => api.post('/api/questions', questionData),
    update: (id: string, questionData: any) => api.put(`/api/questions/${id}`, questionData),
    delete: (id: string) => api.delete(`/api/questions/${id}`),
    getByTopic: (topicId: string) => api.get(`/api/topics/${topicId}/questions`),
  },
  
  // Test endpoints
  tests: {
    getAll: (params?: any) => api.get('/api/tests', { params }),
    getById: (id: string) => api.get(`/api/tests/${id}`),
    create: (testData: any) => api.post('/api/tests', testData),
    update: (id: string, testData: any) => api.put(`/api/tests/${id}`, testData),
    delete: (id: string) => api.delete(`/api/tests/${id}`),
    publish: (id: string) => api.post(`/api/tests/${id}/publish`),
    getForStudent: () => api.get('/api/tests/available'),
  },
  
  // Submission endpoints
  submissions: {
    create: (testId: string, submissionData: any) => 
      api.post(`/api/tests/${testId}/submissions`, submissionData),
    getById: (testId: string, submissionId: string) => 
      api.get(`/api/tests/${testId}/submissions/${submissionId}`),
    getForTest: (testId: string) => api.get(`/api/tests/${testId}/submissions`),
    getForStudent: (studentId: string) => api.get(`/api/students/${studentId}/submissions`),
  },
  
  // Analytics endpoints
  analytics: {
    getStudentPerformance: (studentId: string) => 
      api.get(`/api/analytics/students/${studentId}/performance`),
    getClassPerformance: (classId: string) => 
      api.get(`/api/analytics/classes/${classId}/performance`),
    getSchoolPerformance: () => api.get('/api/analytics/school/performance'),
    getTestAnalytics: (testId: string) => api.get(`/api/analytics/tests/${testId}`),
    getTopicAnalytics: (topicId: string) => api.get(`/api/analytics/topics/${topicId}`),
  },
  
  // Topics endpoints
  topics: {
    getAll: (params?: any) => api.get('/api/topics', { params }),
    getById: (id: string) => api.get(`/api/topics/${id}`),
    create: (topicData: any) => api.post('/api/topics', topicData),
    update: (id: string, topicData: any) => api.put(`/api/topics/${id}`, topicData),
    delete: (id: string) => api.delete(`/api/topics/${id}`),
  },
};
