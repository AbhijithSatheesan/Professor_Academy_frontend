import React, { useState, useEffect } from 'react';

const imageBasePath = 'http://127.0.0.1:8000/'; // Adjust if needed
const placeholderImagePath = 'path/to/your/placeholder.png'; // Adjust path

function Categories() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/colleges/categories')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Categories</h1>
      {data ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="w-full h-80 rem"> {/* Fixed height of 10rem (40) */}
                <img
                  src={`${imageBasePath}${item.image}`}
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
