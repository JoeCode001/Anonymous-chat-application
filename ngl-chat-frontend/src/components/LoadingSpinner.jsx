import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center space-y-2 text-center">
        <FaSpinner className="animate-spin text-purple-600 text-4xl" />
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
