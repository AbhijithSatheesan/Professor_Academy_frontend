import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/users/password-reset/', { email });
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      if (error.response && error.response.status === 404) {
        setMessage('User not found. Please check your email and try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Request Password Reset
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Request Reset
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-3 text-center text-sm">
            <p className={`font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetRequest;