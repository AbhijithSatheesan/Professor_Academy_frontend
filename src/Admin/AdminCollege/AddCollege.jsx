import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AddCollege = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    newCategory: '',
    subcategories: [],
    courses: '',
    location: '',
    priority: '',
    main_image: null,
    hostel_image: null,
    library_image: null,
    class_image: null,
    lab_image: null,
    other_images: []
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, subcategoriesResponse] = await Promise.all([
          axios.get('/api/colleges/categories'),
          axios.get('/api/colleges/subcategories')
        ]);
        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
        console.log(categoriesResponse, subcategoriesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: name === 'other_images' ? Array.from(files) : files[0] }));
    } else if (type === 'checkbox') {
      const updatedSubcategories = e.target.checked
        ? [...formData.subcategories, value]
        : formData.subcategories.filter(id => id !== value);
      setFormData(prev => ({ ...prev, subcategories: updatedSubcategories }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    if (showNewCategoryInput && formData.newCategory) {
      try {
        const newCategoryResponse = await axios.post('/api/add-category/', { name: formData.newCategory });
        submitData.append('category', newCategoryResponse.data.id);
      } catch (error) {
        console.error('Error adding new category:', error);
        setMessage('Failed to add college');
        return;
      }
    } else {
      submitData.append('category', formData.category);
    }

    Object.keys(formData).forEach(key => {
      if (key === 'subcategories') {
        formData[key].forEach(subcategoryId => {
          submitData.append('subcategories', subcategoryId);
        });
      } else if (key === 'other_images') {
        formData[key].forEach(image => {
          submitData.append('other_images', image);
        });
      } else if (formData[key] !== null && key !== 'newCategory') {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('/api/colleges/addcollege', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('College added:', response.data);
      setMessage('Successfully added college');
      setFormData({
        name: '',
        category: '',
        newCategory: '',
        subcategories: [],
        courses: '',
        location: '',
        priority: '',
        main_image: null,
        hostel_image: null,
        library_image: null,
        class_image: null,
        lab_image: null,
        other_images: []
      });
      setShowNewCategoryInput(false);
    } catch (error) {
      console.error('Error adding college:', error);
      setMessage('Failed to add college');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New College</h2>
      <Link
          to="/adminishere"
          className="mb-6 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Dashboard
        </Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">College Name</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          {!showNewCategoryInput ? (
            <div className="flex items-center">
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={() => setShowNewCategoryInput(true)}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <input 
                name="newCategory" 
                value={formData.newCategory} 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="New Category Name"
              />
              <button 
                type="button" 
                onClick={() => setShowNewCategoryInput(false)}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          )}
          <button 
            type="button" 
            onClick={() => window.location.href = '/addcategories'}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Category/Subcategory
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subcategories</label>
          <div className="mt-2 space-y-2">
            {subcategories.map(subcategory => (
              <label key={subcategory.id} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="subcategories"
                  value={subcategory.id}
                  checked={formData.subcategories.includes(subcategory.id.toString())}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-gray-700">{subcategory.name}</span>
              </label>
            ))}
          </div>
          <button 
            type="button" 
            onClick={() => window.location.href = '/addcategories'}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Subcategory
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Courses</label>
          <input 
            name="courses" 
            value={formData.courses} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <input 
            name="priority" 
            type="number" 
            value={formData.priority} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {['main_image', 'hostel_image', 'library_image', 'class_image', 'lab_image'].map((imageName) => (
          <div key={imageName}>
            <label className="block text-sm font-medium text-gray-700">
              {imageName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <input 
              name={imageName} 
              type="file" 
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Other Images</label>
          <input 
            name="other_images" 
            type="file" 
            multiple 
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add College
          </button>
        </div>
        <Link
          to="/adminishere"
          className="mb-6 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Dashboard
        </Link>
      </form>
      

      {message && (
        <div 
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white ${
            message.includes('Successfully') ? 'bg-green-600' : 'bg-red-600'
          } transition-opacity duration-300 ${message ? 'opacity-100' : 'opacity-0'}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddCollege;





