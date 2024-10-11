import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';
import backlogo from '../../assets/professor.png';
import CollegeCard from '../../components/CollegeCard/CollegeCard';
import api, { getFullURL } from '../../../api'; // Custom Axios instance and utility function

function CollegeList() {
  const { subCategoryId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [collegesVisible, setCollegesVisible] = useState(false);
  const navigate = useNavigate();

  const storedBackgroundImage = localStorage.getItem('subcategoryBackgroundImage') || placeholderImagePath;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await api.get(`/api/colleges/subcategory/${subCategoryId}/colleges/`);
        setData(response.data);
        setLoading(false);

        const showBackgroundTimeout = setTimeout(() => {
          setBackgroundVisible(true);
          const showCollegesTimeout = setTimeout(() => {
            setCollegesVisible(true);
          }, 500);
          return () => clearTimeout(showCollegesTimeout);
        }, 100);

        return () => clearTimeout(showBackgroundTimeout);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [subCategoryId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
        <p className='text-center text-xl font-semibold text-gray-800 animate-pulse'>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className='text-center text-red-500'>Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  const handleCollegeClick = (collegeId, collegeData) => {
    navigate(`/college/${collegeId}`, { state: { collegeData } });
  };

  const sortedData = data.slice().sort((a, b) => b.priority - a.priority);

  return (
    <div className="p-8 relative min-h-screen">
      <div
        className={`fixed inset-0 bg-cover bg-center blur-sm transition-all duration-1000 ease-in-out ${
          backgroundVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${storedBackgroundImage})`,
        }}
      />
      <div className="fixed top-24 right-6 z-0">
        <img src={backlogo} alt="Backlogo" className="h-20 w-auto" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        {collegesVisible ? (
          <ul className="flex flex-col w-full max-w-4xl space-y-4">
            {sortedData.map((item, index) => {
              const imageUrl = item.main_image ? getFullURL(item.main_image) : null;
              
              return (
                <CollegeCard
                  key={index}
                  collegeData={{...item, main_image: imageUrl}}
                  onCollegeClick={handleCollegeClick}
                />
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-white animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default CollegeList;









