import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const placeholderImagePath = '../../assets/no_image.png'; // Adjust path

function Categories() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/colleges/categories') // Relative URL
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/subcategories/${categoryId}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Categories</h1>
      {data ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.map((item, index) => (
            <li
              key={index}
              className="aspect-square bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 cursor-pointer" // Added cursor-pointer
              onClick={() => handleCategoryClick(item.id)} // Handle click
            >
              <div className="w-full h-60"> {/* Fixed height of 10rem (40) */}
                <img
                  src={item.image}
                  alt={`Category Image for ${item.name}`}
                  onError={(event) => {
                    event.target.src = placeholderImagePath; // Set placeholder on error
                  }}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="block text-center text-lg font-medium p-4">{item.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default Categories;
