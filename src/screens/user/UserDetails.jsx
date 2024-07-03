import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';
import locationIcon from '../../assets/location-icon.png';
import { FaUniversity, FaMoneyBillAlt, FaSignOutAlt, FaArrowLeft, FaUserShield } from 'react-icons/fa';
import backlogo from '../../assets/professor.png';

const UserDetails = () => {
  const user = useSelector(state => state.user);
  const { user_id, access, image, user_name } = user;
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('user');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    const decodedToken = decodeToken(access);
    setIsAdmin(decodedToken && decodedToken.is_staff);
  }, [access]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user_id) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`/api/users/profile/${user_id}/`, {
          headers: {
            'Authorization': `Bearer ${access}`
          }
        });
        setUserDetails(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [user_id, access, navigate]);

  const handleCollegeClick = (college) => {
    navigate(`/college/${college.college_id}`, { state: { collegeData: college } });
  };

  const handleOptionCollegesClick = () => {
    setCurrentView('colleges');
  };

  const handleFeeUpdatedClick = () => {
    setCurrentView('feeUpdated');
  };

  const handleBackToUserClick = () => {
    setCurrentView('user');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
        <p className="text-center text-2xl font-semibold text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredColleges = currentView === 'feeUpdated'
    ? userDetails?.marked_colleges.filter(college => college.fee && college.fee !== '0')
    : userDetails?.marked_colleges;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <div className={`user-details bg-gray-700 text-white shadow-lg p-6 w-full md:w-1/3 lg:w-1/5 md:fixed ${currentView === 'user' ? 'h-screen' : 'md:h-screen'} overflow-y-auto ${currentView !== 'user' && window.innerWidth < 768 ? 'hidden' : ''}`}>
        <div className="flex flex-row items-center mb-4">
          {image && (
            <img
              src={image}
              alt={user_name}
              className="rounded-full w-16 h-16 object-cover mr-4 md:w-16 md:h-16"
            />
          )}
          <div className="text-xs md:text-base">
            <h2 className="text-lg md:text-xl font-bold mb-1">{user_name}</h2>
            <p>{userDetails?.email}</p>
            <p>{userDetails?.user_type}</p>
          </div>
        </div>
        <div className="border-b border-gray-100 mb-4"></div>
        <div className="flex flex-col text-xs md:text-base">
          <div className="flex items-center mb-4 cursor-pointer" onClick={handleOptionCollegesClick}>
            <FaUniversity className="text-xl md:text-2xl mr-2" />
            <span>Marked Colleges </span>
          </div>
          <div className="border-b border-gray-100 mb-4"></div>
          <div className="flex items-center mb-2 cursor-pointer" onClick={handleFeeUpdatedClick}>
            <FaMoneyBillAlt className="text-xl md:text-2xl mr-2" />
            <span>Fee Updated</span>
          </div>
        </div>
        <div className="mt-2 border-t border-gray-100 pt-4 flex flex-col space-y-4">
          {isAdmin && (
            <div className="flex items-center cursor-pointer">
              <FaUserShield className="text-xl md:text-2xl mr-2" />
              <Link to="/adminishere" className="text-white">
                Admin Panel
              </Link>
            </div>
          )}
          <div className="flex items-center">
            <FaSignOutAlt className="text-xl md:text-2xl mr-2" />
            <Link to="/logout" className="text-white">
              Logout
            </Link>
          </div>
        </div>
      </div>

      {(currentView !== 'user' || window.innerWidth >= 768) && (
        <div className="flex flex-col items-center py-10 px-4 md:px-20 w-full md:w-2/3 lg:w-4/5 md:ml-[33.333333%] lg:ml-[20%]">
          {currentView !== 'user' && window.innerWidth < 768 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 flex items-center"
              onClick={handleBackToUserClick}
            >
              <FaArrowLeft className="mr-2" /> Back to Profile
            </button>
          )}
          <div className="w-full">
            {filteredColleges?.map((college) => (
              <div
                key={college.college_id}
                className="college-card bg-white shadow-md overflow-hidden cursor-pointer mb-4 w-full md:flex"
                onClick={() => handleCollegeClick(college)}
              >
                <div className="relative md:w-48 md:h-48">
                  <img
                    src={college.main_image || placeholderImagePath}
                    alt={college.college_name}
                    className="w-full md:w-48 md:h-48 object-cover"
                  />
                  {college.marked_colleges && (
                    <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-md">
                      Marked
                    </div>
                  )}
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-bold mb-2">{college.college_name}</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">Category:</span> {college.category}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                    {college.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Fee:</span> {college.fee || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;