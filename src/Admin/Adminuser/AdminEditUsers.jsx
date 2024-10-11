import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api';

const AdminEditUsers = () => {
  const [user, setUser] = useState(null);
  const [editingCollege, setEditingCollege] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.user.access);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/api/users/admin-users/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleBack = () => {
    navigate('/adminishere', { state: { selectedComponent: 'Users' } });
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/users/admin-users/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        handleBack();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await api.patch(`/api/users/admin-users/${id}/`, updatedData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      fetchUser();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditCollege = (college) => {
    setEditingCollege(college);
  };

  const handleUpdateCollege = async (markedId, fee) => {
    const data = {
      marked_id: markedId,
      fee: fee
    };
    console.log('Updating college with data:', data);
    try {
      await api.put(`/api/users/admin-users/${id}/update-marked-college/`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      fetchUser();
      setEditingCollege(null);
    } catch (error) {
      console.error('Error updating college:', error);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-300">Edit User: {user.username}</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <p className="mb-2"><span className="font-medium">Username:</span> {user.username}</p>
        <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
        <p className="mb-4"><span className="font-medium">User Type:</span> {user.user_type}</p>
        <button 
          onClick={handleDeleteUser}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Delete User
        </button>
      </div>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Marked Colleges</h3>
        {user.marked_colleges.map(college => (
          <div key={college.id} className="bg-gray-100 p-4 rounded-lg mb-4">
            {editingCollege && editingCollege.id === college.id ? (
              <div>
                <p className="mb-2">{college.college_name}</p>
                <input
                  type="number"
                  value={editingCollege.fee}
                  onChange={(e) => setEditingCollege({...editingCollege, fee: e.target.value})}
                  className="w-full p-2 mb-2 border rounded"
                />
                <button 
                  onClick={() => handleUpdateCollege(college.id, editingCollege.fee)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-2">{college.college_name}</p>
                <p className="mb-2">Fee: {college.fee}</p>
                <button 
                  onClick={() => handleEditCollege(college)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition duration-300"
                >
                  Edit Fee
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEditUsers;




// import React from 'react';
// import { useLocation, useParams, useNavigate } from 'react-router-dom';

// const AdminEditUsers = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = location.state?.user;

//   if (!user) {
//     return <div>User not found</div>;
//   }

//   const handleBack = () => {
//     navigate('/adminishere', { state: { selectedComponent: 'Users' } });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <button
//         onClick={handleBack}
//         className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
//       >
//         ← Back
//       </button>
//       <h2 className="text-3xl font-bold mb-6">Edit User</h2>
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <p className="mb-4"><strong>User ID:</strong> {id}</p>
//         {user.image ? (
//           <img src={user.image} alt={user.username} className="w-24 h-24 rounded-full mb-4" />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
//             <span className="text-gray-500">No image available</span>
//           </div>
//         )}
//         {/* Add more user details and edit form here */}
//       </div>
//     </div>
//   );
// };

// export default AdminEditUsers;