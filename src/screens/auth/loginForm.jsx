import { useNavigate } from 'react-router-dom'
import React, {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('api/users/login/', {
          username,password
        });
        console.log('login successfull:', response.data);

        dispatch(addUser(response.data));
        navigate('/')
      }
      catch (error) {
        console.log('Error logging in:',error);
        setError('Invalid username or password')
      }
    };
    

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
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
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  </div>
  )
}

export default LoginForm




