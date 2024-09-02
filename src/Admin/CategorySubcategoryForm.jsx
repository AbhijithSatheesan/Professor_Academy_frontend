import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CategorySubcategoryForm = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    image: null,
    priority: 1,
    parent_category: ''
  });
  const [notification, setNotification] = useState(null);
  const accessToken = useSelector(state => state.user.access);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (notification && notification.type === 'success') {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/colleges/categories', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post('/api/colleges/addcategories', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      setNotification({ type: 'success', message: 'Successfully added!' });
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error adding item:', error);
      setNotification({ type: 'error', message: 'Failed to add item' });
    }
  };

  const resetForm = () => {
    setFormData({
      ...formData,
      name: '',
      image: null,
      priority: 1,
      parent_category: ''
    });
  };

  const toggleForm = (formType) => {
    setActiveForm(activeForm === formType ? null : formType);
    setFormData({
      type: formType,
      name: '',
      image: null,
      priority: 1,
      parent_category: ''
    });
    setNotification(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <button 
        onClick={() => navigate('/adminishere')} 
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
      >
        Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Category or Subcategory</h2>
      
      {notification && (
        <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => toggleForm('category')}
          className={`px-6 py-3 rounded-full text-white font-semibold transition duration-300 ${
            activeForm === 'category' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {activeForm === 'category' ? 'Hide Category Form' : 'Add Category'}
        </button>
        
        <button
          onClick={() => toggleForm('subcategory')}
          className={`px-6 py-3 rounded-full text-white font-semibold transition duration-300 ${
            activeForm === 'subcategory' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {activeForm === 'subcategory' ? 'Hide Subcategory Form' : 'Add Subcategory'}
        </button>
      </div>

      {activeForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {activeForm === 'subcategory' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category:</label>
              <select
                name="parent_category"
                value={formData.parent_category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          )}
          {activeForm === 'category' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image:</label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority:</label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-3 rounded-md text-white font-semibold transition duration-300 ${
              activeForm === 'category' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Add {activeForm === 'category' ? 'Category' : 'Subcategory'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CategorySubcategoryForm;