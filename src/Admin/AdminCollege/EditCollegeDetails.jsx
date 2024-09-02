import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Set up CSRF token handling for axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

const EditCollegeDetails = ({ collegeId, onBack }) => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [newOtherImages, setNewOtherImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageDeleteModalOpen, setIsImageDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isMainImageDeleteModalOpen, setIsMainImageDeleteModalOpen] = useState(false);
  const [mainImageToDelete, setMainImageToDelete] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const accessToken = useSelector(state => state.user.access);

  useEffect(() => {
    fetchCollegeDetails();
    fetchSubcategories();
  }, [collegeId]);

  const fetchCollegeDetails = async () => {
    try {
      const response = await axios.get(`/api/colleges/seecollegedetails/${collegeId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setCollege(response.data);
    } catch (error) {
      console.error('Error fetching college details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('/api/colleges/subcategories', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollege(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setCollege(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubcategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setCollege(prev => ({ ...prev, parent_subcategories: selectedOptions }));
  };

  const handleOtherImageDelete = (imageId) => {
    setImageToDelete(imageId);
    setIsImageDeleteModalOpen(true);
  };

  const confirmImageDelete = async () => {
    try {
      await axios.delete(`/api/colleges/other-images/${imageToDelete}/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setCollege(prev => ({
        ...prev,
        other_images: prev.other_images.filter(img => img.id !== imageToDelete)
      }));
      setMessage('Image deleted successfully!');
      setIsMessageModalOpen(true);
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Failed to delete image');
      setIsMessageModalOpen(true);
    } finally {
      setIsImageDeleteModalOpen(false);
      setImageToDelete(null);
    }
  };

  const handleNewOtherImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewOtherImages(prev => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    const formData = new FormData();
    Object.keys(college).forEach(key => {
      if (key === 'parent_subcategories') {
        college[key].forEach(subcatId => formData.append('parent_subcategories', subcatId));
      } else if (college[key] instanceof File) {
        formData.append(key, college[key]);
      } else if (college[key] !== null && !['main_image', 'hostel_image', 'library_image', 'class_image', 'lab_image'].includes(key)) {
        formData.append(key, college[key]);
      }
    });

    newOtherImages.forEach((file, index) => {
      formData.append(`new_other_images`, file);
    });

    try {
      const response = await axios.put(`/api/colleges/updatecollege/${collegeId}/`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Response:', response.data);
      setMessage('College updated successfully!');
      setIsMessageModalOpen(true);
      fetchCollegeDetails();
      setNewOtherImages([]);
    } catch (error) {
      console.error('Error updating college:', error.response?.data || error.message);
      setMessage('Failed to update college: ' + (error.response?.data?.detail || error.message));
      setIsMessageModalOpen(true);
    } finally {
      setIsUpdateModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/colleges/updatecollege/${collegeId}/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setMessage('College deleted successfully!');
      setIsMessageModalOpen(true);
      onBack();
    } catch (error) {
      console.error('Error deleting college:', error);
      setMessage('Failed to delete college');
      setIsMessageModalOpen(true);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleMainImageDelete = (field, action) => {
    setMainImageToDelete({ field, action });
    setIsMainImageDeleteModalOpen(true);
  };

  const confirmMainImageDelete = async () => {
    if (mainImageToDelete.action === 'delete') {
      setCollege(prev => ({ ...prev, [mainImageToDelete.field]: null }));
    } else if (mainImageToDelete.action === 'change') {
      // Open file input programmatically
      document.querySelector(`input[name="${mainImageToDelete.field}"]`).click();
    }
    setIsMainImageDeleteModalOpen(false);
    setMainImageToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <button onClick={onBack} className="mb-4 bg-gray-300 px-14 py-2 rounded">Back</button>
      <h2 className="text-2xl font-bold mb-4">Edit College Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={college.name}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Courses:</label>
          <input
            type="text"
            name="courses"
            value={college.courses || ''}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Location:</label>
          <input
            type="text"
            name="location"
            value={college.location || ''}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Priority:</label>
          <input
            type="number"
            name="priority"
            value={college.priority || ''}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {['main_image', 'hostel_image', 'library_image', 'class_image', 'lab_image'].map(imageField => (
          <div key={imageField} className="mb-4">
            <label className="block font-semibold mb-2">{imageField.replace('_', ' ').charAt(0).toUpperCase() + imageField.slice(1).replace('_', ' ')}:</label>
            {college[imageField] ? (
              <div className="flex items-center space-x-4">
                <img src={college[imageField]} alt={imageField} className="w-32 h-32 object-cover rounded" />
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleMainImageDelete(imageField, 'delete')}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <input
                type="file"
                name={imageField}
                onChange={handleImageChange}
                className="w-full border rounded px-2 py-1"
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block font-semibold mb-2">Other Images:</label>
          <div className="grid grid-cols-3 gap-4">
            {college.other_images && college.other_images.map(otherImage => (
              <div key={otherImage.id} className="relative">
                <img src={otherImage.image} alt={`Other Image ${otherImage.id}`} className="w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleOtherImageDelete(otherImage.id)}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-bl text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="file"
              multiple
              onChange={handleNewOtherImageChange}
              className="hidden"
              id="other-images-input"
            />
            <label 
              htmlFor="other-images-input" 
              className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Add New Images
            </label>
          </div>
          {newOtherImages.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">New images to be added:</p>
              <ul className="list-disc list-inside">
                {newOtherImages.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update College</button>
          <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete College</button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this college?"
      />

      <ConfirmationModal
        isOpen={isImageDeleteModalOpen}
        onClose={() => setIsImageDeleteModalOpen(false)}
        onConfirm={confirmImageDelete}
        message="Are you sure you want to delete this image?"
      />

      <ConfirmationModal
        isOpen={isMainImageDeleteModalOpen}
        onClose={() => setIsMainImageDeleteModalOpen(false)}
        onConfirm={confirmMainImageDelete}
        message={`Are you sure you want to ${mainImageToDelete?.action} the ${mainImageToDelete?.field?.replace('_', ' ')}?`}
      />

      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={confirmUpdate}
        message="Are you sure you want to update this college?"
      />

      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        message={message}
      />
    </div>
  );
};

export default EditCollegeDetails;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditCollegeDetails = ({ collegeId, onBack }) => {
//   const [college, setCollege] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCollegeDetails();
//   }, [collegeId]);

//   const fetchCollegeDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/api/colleges/seecollegedetails/${collegeId}`);
//       setCollege(response.data);
//     } catch (error) {
//       console.error('Error fetching college details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCollege(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageDelete = (field) => {
//     setCollege(prev => ({ ...prev, [field]: null }));
//   };

//   const handleImageUpload = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCollege(prev => ({ ...prev, [field]: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleOtherImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCollege(prev => ({
//           ...prev,
//           other_images: [...prev.other_images, { id: Date.now(), image: reader.result }]
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeOtherImage = (index) => {
//     setCollege(prev => ({
//       ...prev,
//       other_images: prev.other_images.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log('Data being sent to backend:', college);
//     try {
//       await axios.put(`/api/colleges/updatecollege/${collegeId}`, college);
//       alert('College details updated successfully!');
//     } catch (error) {
//       console.error('Error updating college:', error);
//       alert('Failed to update college details.');
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this college? This action cannot be undone.')) {
//       try {
//         await axios.delete(`/api/colleges/updatecollege/${collegeId}`);
//         alert('College deleted successfully!');
//         onBack(); // Navigate back to the college list
//       } catch (error) {
//         console.error('Error deleting college:', error);
//         alert('Failed to delete college.');
//       }
//     }
//   };

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="space-y-4">
//       <button
//         onClick={onBack}
//         className="mb-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//       >
//         Back to Colleges
//       </button>

//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h2 className="text-2xl font-bold mb-4">Edit College Details</h2>

//         {/* Basic Details */}
//         {['name', 'courses', 'location', 'priority'].map((field) => (
//           <div key={field} className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               {field.charAt(0).toUpperCase() + field.slice(1)}:
//             </label>
//             <input
//               type="text"
//               name={field}
//               value={college[field]}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         ))}

//         {/* Main Images */}
//         {['main_image', 'hostel_image', 'library_image', 'class_image', 'lab_image'].map((field) => (
//           <div key={field} className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
//             </label>
//             {college[field] ? (
//               <div>
//                 <img src={college[field]} alt={field} className="mt-2 w-full h-48 object-cover rounded" />
//                 <button
//                   type="button"
//                   onClick={() => handleImageDelete(field)}
//                   className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Delete Image
//                 </button>
//               </div>
//             ) : (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, field)}
//                 className="w-full p-2 border rounded"
//               />
//             )}
//           </div>
//         ))}

//         {/* Other Images */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Other Images:</label>
//           {college.other_images.map((img, index) => (
//             <div key={img.id} className="flex items-center mb-2">
//               <img src={img.image} alt={`Other ${index}`} className="w-24 h-24 object-cover rounded mr-2" />
//               <button
//                 type="button"
//                 onClick={() => removeOtherImage(index)}
//                 className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleOtherImageUpload}
//             className="w-full p-2 border rounded mt-2"
//           />
//         </div>

//         <div className="flex justify-between items-center mt-6">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             onClick={handleDelete}
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//           >
//             Delete College
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditCollegeDetails;