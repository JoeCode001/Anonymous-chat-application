import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',  // replace with your Laravel API URL
  headers: {
    Accept: 'application/json',
  },
});

// Auto-set token from localStorage on load
const savedToken = localStorage.getItem('authToken');
if (savedToken) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}

// Optional helper to update token manually
export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  }
}


export default apiClient;
