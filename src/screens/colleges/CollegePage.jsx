import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import likedicon from '../../assets/liked.png';
import notlikedicon from '../../assets/like.png';
import axios from 'axios';
import { updateMarkedCollegeIds } from '../../utils/userSlice';
import backlogo from '../../assets/professor.png';
import nocollegeimage from '../../assets/collegeicon.png'
import api from '../../../api';
import { getFullURL } from '../../../api';


const CollegePage = () => {
  const { collegeId } = useParams();
  const [collegeData, setCollegeData] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showLikeMessage, setShowLikeMessage] = useState(true);

  const dispatch = useDispatch();
  const markedCollegeIds = useSelector(state => state.user?.marked_college_ids || []);
  const userId = useSelector(state => state.user?.user_id);
  const accessToken = useSelector(state => state.user?.access);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const response = await api.get(`/api/colleges/seecollegedetails/${collegeId}`);
        setCollegeData(response.data);
      } catch (error) {
        console.error('Error fetching college data:', error);
      }
    };

    fetchCollegeData();

    const hideLikeMessageTimeout = setTimeout(() => {
      setShowLikeMessage(false);
    }, 3000);

    return () => clearTimeout(hideLikeMessageTimeout);
  }, [collegeId]);

  if (!collegeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img src={backlogo} alt="Loading..." className="h-24 w-auto mb-6 animate-pulse" />
        <p className="text-center text-3xl font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  const {
    id,
    name,
    courses,
    priority,
    main_image,
    hostel_image,
    library_image,
    class_image,
    lab_image,
    other_images,
    category,
    parent_subcategory,
  } = collegeData;

  const handleImageClick = (image) => setModalImage(image);
  const handleCloseModal = () => setModalImage(null);

  const handleLikeClick = async () => {
    try {
      await api.post(
        '/api/users/markcollege/',
        { user_id: userId, college_id: id, fee: 0 },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      dispatch(updateMarkedCollegeIds({ collegeId: id }));
    } catch (error) {
      console.error('Error marking college:', error);
    }
  };

  const isLiked = markedCollegeIds.includes(id);

  const imageSections = [
    { label: 'Classroom', image: getFullURL(class_image) },
    { label: 'Lab', image: getFullURL(lab_image) },
    { label: 'Library', image: getFullURL(library_image) },
    { label: 'Hostel', image: getFullURL(hostel_image) },
    ...(other_images.length > 0 ? [{ label: 'Other Images', images: other_images.map(img => getFullURL(img.image)) }] : []),
  ].filter(section => section.image || section.images);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <img
              src={main_image ? getFullURL(main_image) : nocollegeimage}
              
              alt={`image for ${name}`}
              className="w-full h-full object-cover object-center cursor-pointer"
              onClick={() => handleImageClick(main_image || nocollegeimage)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 w-full">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{name}</h1>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-white">{category} | {parent_subcategory}</p>
                  <div className="relative">
                    <img
                      src={isLiked ? likedicon : notlikedicon}
                      alt={isLiked ? 'Liked' : 'Not liked'}
                      className="h-10 w-10 cursor-pointer bg-white rounded-full p-2 shadow-lg transition-transform transform hover:scale-110"
                      onClick={handleLikeClick}
                    />
                    {showLikeMessage && (
                      <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
                        Like this college
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Courses</h2>
                <p className="text-gray-700">{courses}</p>
              </div>
              {/* <div>
                <h2 className="text-xl font-semibold mb-2">Priority</h2>
                <p className="text-gray-700">{priority}</p>
              </div> */}
            </div>

            <div className="space-y-8">
              {imageSections.map((section, index) => (
                <div key={index} className="border-t pt-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">{section.label}</h2>
                  {section.image && (
                    <div className="flex justify-center">
                      <img
                        src={section.image}
                        alt={section.label}
                        className="w-full max-w-3xl object-cover cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105"
                        onClick={() => handleImageClick(section.image)}
                      />
                    </div>
                  )}
                  {section.images && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.images.map((image, idx) => (
                        <div key={idx} className="flex justify-center">
                          <img
                            src={image}
                            alt={`Other image ${idx + 1}`}
                            className="w-full h-64 object-cover cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105"
                            onClick={() => handleImageClick(image)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-7xl">
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Full view"
              className="w-full max-h-[75vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegePage;






