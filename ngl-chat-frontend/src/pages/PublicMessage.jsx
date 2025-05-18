import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import apiClient from '../api/apiClient'; // Adjust path if needed

const AnonymousMessagePage = () => {
  const { email, id } = useParams();
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Colors based on theme
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  // Reset submitted status after 40 seconds
  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
        setContent('');
      }, 4000); // 40 seconds
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/messages', {
        receiver_id: id,
        content,
        is_read: false,
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${bgColor} ${textColor} transition-colors duration-500`}>
      {/* Toggle Button */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="absolute top-6 right-6 p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Card */}
      <div className={`max-w-md w-full p-6 rounded-lg shadow-md ${cardBgColor} border ${borderColor}`}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Send an Anonymous Message to {email}
        </h2>
        
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        
        {submitted ? (
          <div className="text-center">
            <p className="text-green-500 mb-2">Message sent successfully!</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This message will disappear in 40 seconds...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              required
              className={`w-full border ${borderColor} rounded-2xl p-3 resize-none bg-transparent ${textColor}`}
              placeholder="Type your anonymous message here..."
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-3xl transition-colors duration-300 ${
                (isLoading || !content.trim()) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AnonymousMessagePage;