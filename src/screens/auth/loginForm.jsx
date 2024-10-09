import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import BACKEND_URL from '../../components/Backendurl';
import api from '../../../api';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); // Clear error after 3 seconds

      return () => clearTimeout(timer); // Clear timer if component unmounts
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('api/users/login/', {
        username,
        password,
      });
      console.log('login successful:', response.data);

      dispatch(addUser(response.data));
      navigate('/');
    } catch (error) {
      console.log('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-800 min-h-screen flex items-start pt-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
          <button 
          >
            <Link to='/passwordreset' 
            className='text-blue-500'
            >Forgot password ?</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;





