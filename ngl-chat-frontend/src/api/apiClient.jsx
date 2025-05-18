import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://4bd3-102-90-100-101.ngrok-free.app/api',  // replace with your Laravel API URL
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
