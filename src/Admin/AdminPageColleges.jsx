import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCollegeDetails from './EditCollegeDetails';

const AdminPageColleges = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/colleges/subcategories');
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchColleges = async (subCategory) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/colleges/subcategory/${subCategory.id}/colleges/`);
      setColleges(response.data);
      setSelectedSubcategory(subCategory);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null);
    setColleges([]);
    setSelectedCollege(null);
  };

  const handleBackToColleges = () => {
    setSelectedCollege(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-blue-500">Admin Page - Colleges</h1>
      
      {selectedCollege ? (
        <EditCollegeDetails collegeId={selectedCollege.id} onBack={handleBackToColleges} />
      ) : selectedSubcategory ? (
        <>
          <button
            onClick={handleBackToSubcategories}
            className="mb-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Subcategories
          </button>
          <h2 className="text-2xl font-semibold mb-4">
            Colleges in {selectedSubcategory.name}
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => setSelectedCollege(college)}
                >
                  {college.main_image && (
                    <img
                      src={college.main_image}
                      alt={college.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                    <p className="text-gray-600 mb-1">Location: {college.location}</p>
                    <p className="text-gray-600">Priority: {college.priority || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300 text-left"
                  onClick={() => fetchColleges(subcategory)}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPageColleges;