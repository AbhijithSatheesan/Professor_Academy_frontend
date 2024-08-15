import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backlogo from '../assets/professor.png';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.user.access);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/users/stats', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [accessToken]);

  if (!stats) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8 sm:mb-12">
          <img src={backlogo} alt='Professor Logo' className='w-24 h-24 sm:w-32 sm:h-32 mr-4' />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">PROFESSOR CONSULTANCY SERVICES</h1>
        </div>

        <div className="flex items-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ADMIN PANEL</h1>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-700 border-b pb-4">Dashboard</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <ActionButton title="Add User" icon="➕👤" path="/add-student" />
            <ActionButton title="Add College" icon="➕🏫" path="/add-college" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <StatItem title="Total Students" value={stats.student_count} icon="👥" />
            <StatItem title="Total Admins" value={stats.admin_count} icon="🛡️" />
            <StatItem title="Total Colleges" value={stats.college_count} icon="🏫" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ title, icon, path }) => {
  const navigate = useNavigate();
  return (
    <button 
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
      onClick={() => navigate(path)}
    >
      <span className="mr-2">{icon}</span>
      {title}
    </button>
  );
};

const StatItem = ({ title, value, icon }) => (
  <div className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700">{title}</h3>
      <span className="text-2xl sm:text-3xl">{icon}</span>
    </div>
    <p className="text-3xl sm:text-4xl font-bold text-blue-600">{value}</p>
  </div>
);

export default AdminDashboard;
