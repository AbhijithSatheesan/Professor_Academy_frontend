import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import likedicon from '../../assets/liked.png';
import notlikedicon from '../../assets/like.png';
import axios from 'axios';
import { updateMarkedCollegeIds } from '../../utils/userSlice';

const CollegePage = () => {
  const location = useLocation();
  const collegeData = location.state?.collegeData || null;
  const [modalImage, setModalImage] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const dispatch = useDispatch();
  const markedCollegeIds = useSelector(state => state.user?.marked_college_ids || []);
  const userId = useSelector(state => state.user?.user_id);
  const accessToken = useSelector(state => state.user?.access);

  useEffect(() => {
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
  }, []);

  if (!collegeData) {
    return <div className="text-center text-gray-500 mt-10">No college data available</div>;
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
      const response = await axios.post(
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
    { label: 'Hostel', image: hostel_image },
    { label: 'Library', image: library_image },
    { label: 'Class', image: class_image },
    { label: 'Lab', image: lab_image },
    { label: 'Other Images', image: other_images },
  ].filter(section => section.image);

  const storedBackgroundImage = localStorage.getItem('subcategoryBackgroundImage');

  return (
    <div className="p-8 relative min-h-screen">
      <div
        className={`fixed inset-0 bg-cover bg-center blur-sm transition-all duration-1000 ease-in-out ${
          backgroundVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${storedBackgroundImage || placeholderImagePath})`,
        }}
      />
      <div className="fixed top-24 right-6 z-0">
        <img src={likedicon} alt="Liked" className="h-20 w-auto" />
      </div>
      <div className="relative z-10 flex items-center justify-center">
        {contentVisible ? (
          <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
            {main_image && (
              <div className="p-4 flex justify-center">
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
                {imageSections.map(({ label, image }, index) => (
                  <div className="flex items-center p-4 border-b" key={index}>
                    <p className="w-1/4 text-lg font-semibold">{label}</p>
                    <img
                      src={image}
                      alt={label}
                      className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
                      onClick={() => handleImageClick(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-white animate-pulse text-xl">Loading...</p>
        )}
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





// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import likedicon from '../../assets/liked.png';
// import notlikedicon from '../../assets/like.png';

// const CollegePage = () => {
//   const location = useLocation();
//   const collegeData = location.state?.collegeData || null;
//   const [modalImage, setModalImage] = useState(null);
//   const [backgroundVisible, setBackgroundVisible] = useState(false);
//   const [contentVisible, setContentVisible] = useState(false);

//   const markedCollegeIds = useSelector(state => state.user.marked_college_ids || []);

//   useEffect(() => {
//     // Show the background image after 300ms
//     const showBackgroundTimeout = setTimeout(() => {
//       setBackgroundVisible(true);

//       // Show the content after the background image is visible
//       const showContentTimeout = setTimeout(() => {
//         setContentVisible(true);
//       }, 500);

//       // Clean up the timeout on component unmount
//       return () => {
//         clearTimeout(showContentTimeout);
//       };
//     }, 100);

//     // Clean up the timeout on component unmount
//     return () => {
//       clearTimeout(showBackgroundTimeout);
//     };
//   }, []);

//   if (!collegeData) {
//     return <div className="text-center text-gray-500 mt-10">No college data available</div>;
//   }

//   const {
//     id,
//     name,
//     courses,
//     priority,
//     main_image,
//     hostel_image,
//     library_image,
//     class_image,
//     lab_image,
//     other_images,
//     category,
//     parent_subcategory,
//   } = collegeData;

//   const handleImageClick = (image) => {
//     setModalImage(image);
//   };

//   const handleCloseModal = () => {
//     setModalImage(null);
//   };

//   const isLiked = markedCollegeIds.includes(id);

//   const imageSections = [
//     { label: 'Hostel', image: hostel_image },
//     { label: 'Library', image: library_image },
//     { label: 'Class', image: class_image },
//     { label: 'Lab', image: lab_image },
//     { label: 'Other Images', image: other_images },
//   ].filter(section => section.image);

//   const storedBackgroundImage = localStorage.getItem('subcategoryBackgroundImage');

//   return (
//     <div className="p-8 relative min-h-screen">
//       <div
//         className={`fixed inset-0 bg-cover bg-center blur-sm transition-all duration-1000 ease-in-out ${
//           backgroundVisible ? 'opacity-100' : 'opacity-0'
//         }`}
//         style={{
//           backgroundImage: `url(${storedBackgroundImage || placeholderImagePath})`,
//         }}
//       />
//       <div className="fixed top-24 right-6 z-0">
//         <img src={likedicon} alt="Liked" className="h-20 w-auto" />
//       </div>
//       <div className="relative z-10 flex items-center justify-center">
//         {contentVisible ? (
//           <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
//             {main_image && (
//               <div className="p-4 flex justify-center">
//                 <img
//                   src={main_image}
//                   alt={`Main image for ${name}`}
//                   className="w-full max-h-96 object-cover cursor-pointer rounded-md"
//                   onClick={() => handleImageClick(main_image)}
//                 />
//               </div>
//             )}
//             <div className="p-6">
//               {name && <h1 className="text-4xl font-bold mb-4 text-center">{name}</h1>}
//               <div className="flex justify-between items-center">
//                 {courses && (
//                   <p className="mb-2 text-lg">
//                     <span className="font-semibold">Courses:</span> {courses}
//                   </p>
//                 )}
//                 <img
//                   src={isLiked ? likedicon : notlikedicon}
//                   alt={isLiked ? 'Liked' : 'Not liked'}
//                   className="h-6 w-6"
//                 />
//               </div>
//               {priority && (
//                 <p className="mb-2 text-lg">
//                   <span className="font-semibold">Priority:</span> {priority}
//                 </p>
//               )}
//               {category && (
//                 <p className="mb-2 text-lg">
//                   <span className="font-semibold">Category:</span> {category}
//                 </p>
//               )}
//               {parent_subcategory && (
//                 <p className="mb-2 text-lg">
//                   <span className="font-semibold">Parent Subcategory:</span> {parent_subcategory}
//                 </p>
//               )}
//               <div className="mt-4">
//                 {imageSections.map(({ label, image }, index) => (
//                   <div className="flex items-center p-4 border-b" key={index}>
//                     <p className="w-1/4 text-lg font-semibold">{label}</p>
//                     <img
//                       src={image}
//                       alt={label}
//                       className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
//                       onClick={() => handleImageClick(image)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-white animate-pulse text-xl">Loading...</p>
//         )}
//       </div>

//       {modalImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative max-w-5xl w-full p-4">
//             <button
//               className="absolute top-2 right-2 text-white text-2xl"
//               onClick={handleCloseModal}
//             >
//               &times;
//             </button>
//             <img
//               src={modalImage}
//               alt="Modal view"
//               className="w-full h-full object-contain rounded-lg"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CollegePage;







