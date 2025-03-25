import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3003', // Base URL for your backend (user-service)
});

// Interceptor to attach the token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Function for login
export const login = (credentials: { email: string; password: string; }) => {
    return api.post('/auth/login', credentials);
};

// Function to get list of users
export const getUsers = () => {
    return api.get('/users');
};

// Function to create a new user
export const createUser = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
  }) => {
      return api.post('/users', data);
  };
  
// Function to update an existing user
export const updateUser = (id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
  }>) => {
      return api.put(`/users/${id}`, data);
  };
  
// Function to delete a user
export const deleteUser = (id: string) => {
      return api.delete(`/users/${id}`);
};

export default api;
