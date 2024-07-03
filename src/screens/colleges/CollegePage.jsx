import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import likedicon from '../../assets/liked.png';
import notlikedicon from '../../assets/like.png';
import axios from 'axios';
import { updateMarkedCollegeIds } from '../../utils/userSlice';
import placeholderImagePath from '../../assets/no_image.png';
import backlogo from '../../assets/professor.png';

const CollegePage = () => {
  const { collegeId } = useParams();
  const [collegeData, setCollegeData] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const dispatch = useDispatch();
  const markedCollegeIds = useSelector(state => state.user?.marked_college_ids || []);
  const userId = useSelector(state => state.user?.user_id);
  const accessToken = useSelector(state => state.user?.access);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const response = await axios.get(`/api/colleges/seecollegedetails/${collegeId}`);
        setCollegeData(response.data);
      } catch (error) {
        console.error('Error fetching college data:', error);
      }
    };

    fetchCollegeData();

    const showBackgroundTimeout = setTimeout(() => {
      setBackgroundVisible(true);

      const showContentTimeout = setTimeout(() => {
        setContentVisible(true);
      }, 500);

      return () => {
        clearTimeout(showContentTimeout);
      };
    }, 100);

    return () => {
      clearTimeout(showBackgroundTimeout);
    };
  }, [collegeId]);

  if (!collegeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
        <p className="text-center text-2xl font-semibold text-gray-500 animate-pulse">Loading...</p>
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

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleLikeClick = async () => {
    try {
      await axios.post(
        '/api/users/markcollege/',
        {
          user_id: userId,
          college_id: id,
          fee: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch(updateMarkedCollegeIds({ collegeId: id }));
    } catch (error) {
      console.error('Error marking college:', error);
    }
  };

  const isLiked = markedCollegeIds.includes(id);

  const imageSections = [
    { label: 'Classroom', image: class_image },
    { label: 'Lab', image: lab_image },
    { label: 'Library', image: library_image },
    { label: 'Hostel', image: hostel_image },
    ...(other_images.length > 0
      ? [{ label: 'Other Images', images: other_images.map(img => img.image) }]
      : []),
  ].filter(section => section.image || section.images);

  const storedBackgroundImage = localStorage.getItem('subcategoryBackgroundImage');

  return (
    <div className="pt-20">
      <div className="p-8 relative min-h-screen">
        <div
          className={`fixed inset-0 bg-cover bg-center blur-sm transition-all duration-1000 ease-in-out ${
            backgroundVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${storedBackgroundImage || placeholderImagePath})`,
          }}
        />
        <div className="fixed top-6 right-6 z-0">
          <img src={likedicon} alt="Liked" className="h-20 w-auto" />
        </div>
        <div className="relative z-10 flex items-center justify-center">
          {contentVisible ? (
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
              {main_image && (
                <div className="flex justify-center">
                  <img
                    src={main_image}
                    alt={`Main image for ${name}`}
                    className="w-full max-h-96 object-cover cursor-pointer rounded-md"
                    onClick={() => handleImageClick(main_image)}
                  />
                </div>
              )}
              <div className="p-6">
                {name && <h1 className="text-4xl font-bold mb-4 text-center">{name}</h1>}
                <div className="flex justify-between items-center">
                  {courses && (
                    <p className="mb-2 text-lg">
                      <span className="font-semibold">Courses:</span> {courses}
                    </p>
                  )}
                  <img
                    src={isLiked ? likedicon : notlikedicon}
                    alt={isLiked ? 'Liked' : 'Not liked'}
                    className="h-6 w-6 cursor-pointer"
                    onClick={handleLikeClick}
                  />
                </div>
                {priority && (
                  <p className="mb-2 text-lg">
                    <span className="font-semibold">Priority:</span> {priority}
                  </p>
                )}
                {category && (
                  <p className="mb-2 text-lg">
                    <span className="font-semibold">Category:</span> {category}
                  </p>
                )}
                {parent_subcategory && (
                  <p className="mb-2 text-lg">
                    <span className="font-semibold">Parent Subcategory:</span> {parent_subcategory}
                  </p>
                )}
                <div className="mt-4">
                  {imageSections.map((section, index) => (
                    <div key={index} className="mb-6">
                      {section.label && (
                        <h2 className="text-xl font-semibold mb-2">{section.label}</h2>
                      )}
                      {section.image && (
                        <div className="flex justify-center p-4 border-b">
                          <img
                            src={section.image}
                            alt={section.label}
                            className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
                            onClick={() => handleImageClick(section.image)}
                          />
                        </div>
                      )}
                      {section.images && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                          {section.images.map((image, idx) => (
                            <div className="flex justify-center items-center" key={idx}>
                              <img
                                src={image}
                                alt={`Other image ${idx + 1}`}
                                className="max-h-64 object-cover cursor-pointer rounded-sm transition-transform transform hover:scale-105"
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
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
              <p className="text-center text-2xl font-semibold text-white animate-pulse">Loading...</p>
            </div>
          )}
        </div>
      </div>

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-5xl w-full p-4">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Modal view"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegePage;
















