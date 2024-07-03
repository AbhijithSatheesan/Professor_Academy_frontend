import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';
import backlogo from '../../assets/professor.png';
import CollegeCard from '../../components/CollegeCard/CollegeCard';

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
    console.log(`Fetching data for subcategory ID: ${subCategoryId}`);
    fetch(`/api/colleges/subcategory/${subCategoryId}/colleges/`)
      .then(response => {
        if (!response.ok) {
          console.error(`ERROR: ${response.status} ${response.statusText}`);
          return response.text().then(text => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(jsonData => {
        console.log('Data fetched successfully', jsonData);
        setData(jsonData);
        setLoading(false);

        // Show the background image after 300ms
        const showBackgroundTimeout = setTimeout(() => {
          setBackgroundVisible(true);

          // Show the colleges after the background image is visible
          const showCollegesTimeout = setTimeout(() => {
            setCollegesVisible(true);
          }, 500);

          // Clean up the timeout on component unmount
          return () => {
            clearTimeout(showCollegesTimeout);
          };
        }, 100);

        // Clean up the timeout on component unmount
        return () => {
          clearTimeout(showBackgroundTimeout);
        };
      })
      .catch(error => {
        console.error('error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
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
            {sortedData.map((item, index) => (
              <CollegeCard
                key={index}
                collegeData={item}
                onCollegeClick={handleCollegeClick}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-white animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default CollegeList;










