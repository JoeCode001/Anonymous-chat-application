import { useState } from 'react';
import { FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import useAuth from '../context/useAuth';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
//   const { user, login, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      // Replace with your API endpoint
      const response = await apiClient.post('/register', formData);
      console.log(response.data);
      setSuccess('Registration successful! Redirecting...');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      });
      // Redirect or other logic can go here
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Colors based on theme
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const inputBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const inputBorderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const buttonBgColor = 'bg-purple-600 hover:bg-purple-700';
  const formBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgColor} ${textColor}`}>
      <div className={`w-full max-w-md p-8 space-y-8 rounded-lg shadow-xl ${formBgColor}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-center text-purple-600">Create Account</h2>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-purple-600"
            type="button"
          >
            {isDarkMode ? <FaSun size={18} className="text-purple-500" /> : <FaMoon size={18} className="text-purple-500" />}
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${inputBorderColor} rounded-md shadow-sm ${inputBgColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Alice Johnson"
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${inputBorderColor} rounded-md shadow-sm ${inputBgColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="alice@example.com"
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${inputBorderColor} rounded-md shadow-sm ${inputBgColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="password123"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} className="text-purple-500" /> : <FaEye size={18} className="text-purple-500" />}
              </button>
            </div>
          </div>
          
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${inputBorderColor} rounded-md shadow-sm ${inputBgColor} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="password123"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash size={18} className="text-purple-500" /> : <FaEye size={18} className="text-purple-500" />}
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              type="button"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${buttonBgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-green-500 text-sm text-center">
              {success}
            </div>
          )}
          
          {/* Login Link */}
          <div className="text-sm text-center">
            <p>
              Already have an account?{' '}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}