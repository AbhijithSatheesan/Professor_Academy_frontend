import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPageUsers = () => {
  const [users, setUsers] = useState({ students: [], admins: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdmins, setShowAdmins] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('api/users/userslist');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const renderUserTable = (userList, userType) => (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">{userType}</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Username</th>
            <th className="py-2 px-4 border-b text-left">Image</th>
            <th className="py-2 px-4 border-b text-left">User Type</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                {user.image ? (
                  <img src={user.image} alt={user.username} className="w-10 h-10 rounded-full" />
                ) : (
                  "No image"
                )}
              </td>
              <td className="py-2 px-4 border-b">{user.user_type}</td>
              <td className="py-2 px-4 border-b">
                <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAdmins(!showAdmins)}
      >
        {showAdmins ? "Hide Admins" : "Show Admins"}
      </button>
      {showAdmins && renderUserTable(users.admins, 'Admins')}
      {renderUserTable(users.students, 'Students')}
    </div>
  );
};

export default AdminPageUsers;