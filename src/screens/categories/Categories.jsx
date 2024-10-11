import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backlogo from '../../assets/professor.png';
import placeholderImagePath from '../../assets/no_image.png'; // Adjusted the path for importing the placeholder image
import api from '../../../api'; // Assuming you've set up the custom axios instance
import BACKEND_URL from '../../../BackendUrl';
import { getFullURL } from '../../../api';

function Categories() {
  const [data, setData] = useState(null);
  const [logoOnTop, setLogoOnTop] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/colleges/categories'); // Using the axios instance
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Move the logo to the background after 3 seconds
    const timeout = setTimeout(() => {
      setLogoOnTop(false);
    }, 300);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/subcategories/${categoryId}`);
  };

  return (
    <div className="p-8 bg-white relative min-h-screen">
      <div
        className={`fixed inset-0 flex justify-center items-center ${
          logoOnTop
            ? 'transition-none'
            : 'transition-all duration-1000 ease-in-out delay-500'
        } ${logoOnTop ? '' : 'pointer-events-none z-0 bg-contain opacity-50'}`}
        style={{
          backgroundImage: `url(${backlogo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: logoOnTop ? '400px' : '200px',
        }}
      />
      <div
        className={`relative z-10 ${
          logoOnTop ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-1000 ease-in-out`}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Categories</h1>
        {data ? (
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {data.map((item, index) => (
              <li
                key={index}
                className="aspect-auto bg-white shadow-md rounded-sm overflow-hidden transition-transform hover:scale-105 duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(item.id)}
                style={{ minHeight: '200px' }} // Ensures a minimum height for each list item
              >
                <div className="w-full h-4/5">
                  <img
                    src={getFullURL(item.image)}
                    alt={`Category ${item.name}`}
                    onError={(event) => {
                      event.target.src = placeholderImagePath; // Fallback image
                    }}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="block text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium p-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Categories;