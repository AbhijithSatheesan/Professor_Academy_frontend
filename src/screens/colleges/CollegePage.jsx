import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import likedicon from '../../assets/liked.png';
import notlikedicon from '../../assets/like.png';

const CollegePage = () => {
  const location = useLocation();
  const collegeData = location.state?.collegeData || null;
  const [modalImage, setModalImage] = useState(null);

  const markedCollegeIds = useSelector(state => state.user.marked_college_ids || []);

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

  const isLiked = markedCollegeIds.includes(id);

  const imageSections = [
    { label: 'Hostel', image: hostel_image },
    { label: 'Library', image: library_image },
    { label: 'Class', image: class_image },
    { label: 'Lab', image: lab_image },
    {label:'other images', image: other_images},
    
  ].filter(section => section.image);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
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
              className="h-6 w-6"
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









// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import likedicon from '../../assets/liked.png';
// import notlikedicon from '../../assets/like.png'

// const CollegePage = () => {
//   const location = useLocation();
//   const collegeData = location.state?.collegeData || null;
//   const [modalImage, setModalImage] = useState(null);

//   if (!collegeData) {
//     return <div className="text-center text-gray-500 mt-10">No college data available</div>;
//   }

//   const {
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

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
//         {main_image && (
//           <div className="p-4 flex justify-center">
//             <img
//               src={main_image}
//               alt={`Main image for ${name}`}
//               className="w-full max-h-96 object-cover cursor-pointer rounded-md"
//               onClick={() => handleImageClick(main_image)}
//             />
//           </div>
//         )}
//         <div className="p-6">
//           {name && <h1 className="text-4xl font-bold mb-4 text-center">{name}</h1>}
//           {courses && (
//             <p className="mb-2 text-lg">
//               <span className="font-semibold">Courses:</span> {courses}
//             </p>
//           )}
//           {priority && (
//             <p className="mb-2 text-lg">
//               <span className="font-semibold">Priority:</span> {priority}
//             </p>
//           )}
//           {category && (
//             <p className="mb-2 text-lg">
//               <span className="font-semibold">Category:</span> {category}
//             </p>
//           )}
//           {parent_subcategory && (
//             <p className="mb-2 text-lg">
//               <span className="font-semibold">Parent Subcategory:</span> {parent_subcategory}
//             </p>
//           )}
//           <div className="mt-4">
//             {hostel_image && (
//               <div className="flex items-center p-4 border-b">
//                 <p className="w-1/4 text-lg font-semibold">Hostel</p>
//                 <img
//                   src={hostel_image}
//                   alt="Hostel"
//                   className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
//                   onClick={() => handleImageClick(hostel_image)}
//                 />
//               </div>
//             )}
//             {library_image && (
//               <div className="flex items-center p-4 border-b">
//                 <p className="w-1/4 text-lg font-semibold">Library</p>
//                 <img
//                   src={library_image}
//                   alt="Library"
//                   className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
//                   onClick={() => handleImageClick(library_image)}
//                 />
//               </div>
//             )}
//             {class_image && (
//               <div className="flex items-center p-4 border-b">
//                 <p className="w-1/4 text-lg font-semibold">Class</p>
//                 <img
//                   src={class_image}
//                   alt="Class"
//                   className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
//                   onClick={() => handleImageClick(class_image)}
//                 />
//               </div>
//             )}
//             {lab_image && (
//               <div className="flex items-center p-4 border-b">
//                 <p className="w-1/4 text-lg font-semibold">Lab</p>
//                 <img
//                   src={lab_image}
//                   alt="Lab"
//                   className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
//                   onClick={() => handleImageClick(lab_image)}
//                 />
//               </div>
//             )}
//             {other_images && (
//               <div className="flex items-center p-4 border-b">
//                 <p className="w-1/4 text-lg font-semibold">Other</p>
//                 <img
//                   src={other_images}
//                   alt="Other"
//                   className="w-3/4 max-h-64 object-cover cursor-pointer rounded-md transition-transform transform hover:scale-105"
//                   onClick={() => handleImageClick(other_images)}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
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
