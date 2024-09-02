import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/userSlice';

function UserLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the removeUser action
    dispatch(removeUser());

    // Clear any additional storage if needed
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
      Logout
    </button>
  );
}

export default UserLogout;