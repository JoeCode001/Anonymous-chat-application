import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import apiClient from '../api/apiClient';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set token in apiClient headers & localStorage whenever token changes
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
      fetchUser();
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
      setUser(null);
    }
  }, [token]);

  // Fetch user profile from API
  async function fetchUser() {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/user');
      setUser(response.data);
    } catch (err) {
      console.error('Fetch user failed', err);
      setError('Failed to fetch user');
      setUser(null);
      setToken(null); // clear token if invalid
    } finally {
      setLoading(false);
    }
  }

  // Register
  async function register(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/register', data);
      if (response.data.token) {
        setToken(response.data.token);
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
      setToken(null);
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
