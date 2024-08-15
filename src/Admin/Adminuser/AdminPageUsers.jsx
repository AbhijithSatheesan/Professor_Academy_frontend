import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPageUsers = () => {
  const [users, setUsers] = useState({ students: [], admins: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdmins, setShowAdmins] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.user.access);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/userslist?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users. Please try again later.');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };

  const handleUserClick = (user) => {
    navigate(`/admin/edit-user/${user.id}`, { state: { user } });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (error) return <div className="text-red-500 text-center text-xl mt-10">{error}</div>;

  const renderUserTable = (userList, userType) => {
    if (userList.length === 0) {
      return (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-2xl font-bold mb-4 bg-gray-100 p-4">{userType}</h3>
          <p className="text-center text-gray-500">No users found</p>
        </div>
      );
    }

    return (
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-2xl font-bold mb-4 bg-gray-100 p-4">{userType}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userList.map((user) => (
                <tr 
                  key={user.id} 
                  onClick={() => handleUserClick(user)} 
                  className="cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="py-4 px-6 whitespace-nowrap">{user.username}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {user.image ? (
                      <img src={user.image} alt={user.username} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.user_type === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.user_type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User Management</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      <button
        className={`mb-6 px-6 py-2 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
          showAdmins ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        onClick={() => setShowAdmins(!showAdmins)}
      >
        {showAdmins ? "Hide Admins" : "Show Admins"}
      </button>
      {showAdmins && renderUserTable(users.admins, 'Administrators')}
      {renderUserTable(users.students, 'Students')}
      {users.admins.length === 0 && users.students.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No users found matching your search criteria
        </div>
      )}
    </div>
  );
};

export default AdminPageUsers;
