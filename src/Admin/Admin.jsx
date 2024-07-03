import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminPageUsers from './AdminPageUsers';
import AdminPageColleges from './AdminPageColleges';

const Admin = () => {
  const user = useSelector((state) => state.user);
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user.admission_placed === 113) {
      setIsAdmin(true);
    } else {
      console.log('Access denied. User is not an admin.');
      setIsAdmin(false);
    }
  }, [user.admission_placed]);

  if (!isAdmin) {
    return null;
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <AdminDashboard />;
      case 'Users':
        return <AdminPageUsers />;
      case 'Colleges':
        return <AdminPageColleges />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for small screens */}
      {sidebarOpen ? (
        <div className="fixed inset-0 bg-gray-800 text-white z-10 lg:hidden flex flex-col">
          <div className="absolute top-4 right-4 flex flex-col items-end mt-20">
            <img
              src={user.image}
              alt="User"
              className="w-16 h-16 lg:w-24 lg:h-24 rounded-full mb-2"
            />
            <p className="text-sm lg:text-lg font-bold">{user.user_name}</p>
            <p className="text-xs lg:text-sm">Admin</p>
          </div>
          <nav className="mt-24">
            {['Dashboard', 'Users', 'Colleges'].map((item) => (
              <button
                key={item}
                className={`w-full text-left py-2 px-4 text-xs lg:text-sm ${
                  selectedComponent === item ? 'bg-gray-700' : ''
                }`}
                onClick={() => {
                  setSelectedComponent(item);
                  setSidebarOpen(false);
                }}
              >
                {item}
              </button>
            ))}
            <button
              className="w-full text-left py-2 px-4 text-xs lg:text-sm"
              onClick={() => {
                navigate('/myprofile');
                setSidebarOpen(false);
              }}
            >
              Back to Profile
            </button>
          </nav>
        </div>
      ) : (
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            Back to Actions
          </button>
          <div className="max-w-4xl">
            {renderComponent()}
          </div>
        </div>
      )}

      {/* Sidebar for large screens */}
      <div className="hidden lg:block w-90 bg-gray-800 text-white fixed lg:static h-full z-10">
        <div className="p-4 flex flex-col items-center">
          <img
            src={user.image}
            alt="User"
            className="w-16 h-16 lg:w-24 lg:h-24 rounded-full mb-2"
          />
          <p className="text-sm lg:text-lg font-bold">{user.user_name}</p>
          <p className="text-xs lg:text-sm">Admin</p>
        </div>
        <nav className="mt-4">
          {['Dashboard', 'Users', 'Colleges'].map((item) => (
            <button
              key={item}
              className={`w-full text-left py-2 px-4 text-xs lg:text-sm ${
                selectedComponent === item ? 'bg-gray-700' : ''
              }`}
              onClick={() => {
                setSelectedComponent(item);
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="w-full text-left py-2 px-4 text-xs lg:text-sm"
            onClick={() => navigate('/myprofile')}
          >
            Back to Profile
          </button>
        </nav>
      </div>

      {/* Main Content Area for large screens */}
      <div className="hidden lg:block flex-1 p-4 lg:p-8 overflow-y-auto lg:ml-72">
        <div className="max-w-4xl">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
