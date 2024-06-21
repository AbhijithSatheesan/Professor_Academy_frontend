import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';
import locationIcon from '../../assets/location-icon.png';
import { FaUniversity, FaMoneyBillAlt, FaSignOutAlt } from 'react-icons/fa';

const UserDetails = () => {
  const userId = useSelector(state => state.user?.user_id);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showColleges, setShowColleges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`/api/users/profile/${userId}/`);
        setUserDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleCollegeClick = (college) => {
    navigate(`/college/${college.college_id}`, { state: { collegeData: college } });
  };

  const toggleColleges = () => {
    setShowColleges(!showColleges);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

<div className="flex flex-col md:flex-row bg-gray-100 py-0 ">
  {/* User Details */}
  <div className="user-details bg-gray-700 text-white shadow-lg h-screen p-6 mr-4 mb-4 md:mb-0 w-full md:w-1/3  ">
    <div className="flex items-center mb-4">
      {userDetails?.image && (
        <img
          src={userDetails.image}
          alt={userDetails.name}
          className="rounded-full w-16 h-16 object-cover mr-4"
        />
      )}
      <div>
        <h2 className="text-xl font-bold mb-1">{userDetails?.username}</h2>
        <p>{userDetails?.email}</p>
        <p>User Type: {userDetails?.user_type}</p>
      </div>
    </div>
    <div className="border-b border-gray-100 mb-4"></div>
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <FaUniversity className="text-2xl mr-2" />
        <span>Option Colleges</span>
      </div>
      <div className="border-b border-gray-100 mb-2"></div>
      <div className="flex items-center mb-2">
        <FaMoneyBillAlt className="text-2xl mr-2" />
        <span>Fee Updated</span>
      </div>
    </div>
    <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between ">
      <div className="flex items-center ">
        <FaSignOutAlt className="text-2xl mr-2" />
        <Link to="/logout" className="text-white">
          Logout
        </Link>
      </div>
    </div>
  </div>


      {/* College Details */}
      <div className="flex flex-col items-center md:ml-8 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 md:hidden"
          onClick={toggleColleges}
        >
          {showColleges ? 'Hide Colleges' : 'Show Colleges'}
        </button>
        {(showColleges || window.innerWidth >= 768) && (
          <div className="w-full">
            {userDetails?.marked_colleges.map((college) => (
              <div
                key={college.college_id}
                className="college-card bg-white shadow-md  overflow-hidden cursor-pointer mb-4 w-full md:flex"
                onClick={() => handleCollegeClick(college)}
              >
                <div className="relative md:w-48 md:h-48">
                  <img
                    src={college.main_image}
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
        )}
      </div>
    </div>
  );
};

export default UserDetails;