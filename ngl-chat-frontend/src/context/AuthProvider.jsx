import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import apiClient, { setAuthToken } from '../api/apiClient';

export function AuthProvider({ children }) {
  // Get both token and user from localStorage on initial load
  const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set token in apiClient headers & localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      // Only fetch user if we don't already have the user data
      if (!user) fetchUser();
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setAuthToken(null);
    }
  }, [token]);

  // Store user in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else if (user === null && localStorage.getItem('authUser')) {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  // Fetch user profile from API
  async function fetchUser() {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/user');
      setUser(response.data.user);
    } catch (err) {
      console.error('Fetch user failed', err);
      setError('Failed to fetch user');
      setUser(null);
      setToken(null); // clear token if invalid
    } finally {
      setLoading(false);
    }
  }

  // Force refresh user data from API
  async function refreshUser() {
    return fetchUser();
  }

  // Register
  async function register(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/register', data);
      if (response.data.token) {
        setToken(response.data.token);
        // If user data is included in the response, set it directly
        if (response.data.user) {
          setUser(response.data.user);
        }
      }
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Login
  async function login(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/login', data);
      if (response.data.token) {
        setToken(response.data.token);
        // If user data is included in the response, set it directly
        if (response.data.user) {
          setUser(response.data.user);
        }
      }
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function logout() {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/logout');
    } catch (err) {
      console.error('Logout failed', err);
      setError('Logout failed, but session cleared locally');
    } finally {
      // Always clear local data even if the API call fails
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('%c[Auth Debug]', 'color: green; font-weight: bold;');
    console.log('Token:', token);
    console.log('User:', user);
  }, [token, user]);



  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      loading, 
      error, 
      register, 
      login, 
      logout,
      refreshUser,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}