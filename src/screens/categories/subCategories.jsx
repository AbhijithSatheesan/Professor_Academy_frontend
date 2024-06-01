import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';

function Subcategories() {
  const { categoryId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching data for category ID: ${categoryId}`);
    fetch(`/api/colleges/category/${categoryId}/subcategories/`)
      .then(response => {
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return response.text().then(text => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(jsonData => {
        console.log('Data fetched successfully:', jsonData);
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!data || !data.subcategories) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.subcategories.map((item, index) => (
          <li
            key={index}
            className="aspect-square bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300"
          >
            <div className="w-full h-60"> {/* Fixed height of 10rem (40) */}
              <img
                src={item.image}
                alt={`Subcategory Image for ${item.name}`}
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
    </div>
  );
}

export default Subcategories;
