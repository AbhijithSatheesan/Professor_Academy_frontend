import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';
import backlogo from '../../assets/professor.png';
import locationIcon from '../../assets/location-icon.png';

function CollegeList() {
  const { subCategoryId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const storedBackgroundImage = localStorage.getItem('subcategoryBackgroundImage');

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
      })
      .catch(error => {
        console.error('error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [subCategoryId]);

  if (loading) {
    return <p className='text-center text-gray-500'>Loading</p>
  }
  if (error) {
    return <p className='text-center text-red-500'>Error: {error}</p>
  }
  if (!data || data === 0) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  const handleCollegeClick = (collegeId, collegeData) => {
    navigate(`/college/${collegeId}`, { state: { collegeData } });
  }

  return (
    <div className='p-8 bg-black relative min-h-screen'>
    <div
      className='fixed inset-0 pointer-events-none z-0 bg-cover bg-center blur-sm'
      style={{
        backgroundImage: `url(${storedBackgroundImage || placeholderImagePath})`,
      }}
    />
    <div className="p-8 relative z-10">
      <h1 className="text-4xl font-bold mb-4 text-white">{data.name}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <li
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex flex-col sm:flex-row hover:bg-indigo-50"
            style={{ width: '100%', maxWidth: '60rem', height: '100%', maxHeight: '250rem' }} // Responsive size for the container in rem
            onClick={() => handleCollegeClick(item.id, item)}
          >
            <div className="w-full sm:w-1/2 p-2">
              <div className="aspect-w-16 aspect-h-9" style={{ height: '10rem' }}> {/* Fixed height for the image container in rem */}
                <img
                  src={item.main_image}
                  alt={`Subcategory Image for ${item.name}`}
                  onError={(event) => {
                    event.target.src = placeholderImagePath;
                  }}
                  className="object-cover w-full h-full rounded-t-lg sm:rounded-none sm:rounded-l-lg"
                />
              </div>
            </div>
  
            <div className="p-6 flex-grow">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.name}</h2>
              <p className="flex items-center mb-2 text-gray-600">
                <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                Bangalore
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Courses:</span>{' '}
                {item.courses ? (
                  item.courses.split(',').map((course, index) => (
                    <span key={index} className="inline-block mr-2 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">
                      {course.trim()}
                    </span>
                  ))
                ) : (
                  <span>No courses available</span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  
  )
}

export default CollegeList;





// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import placeholderImagePath from '../../assets/no_image.png';

// function CollegeList() {
//   const { subCategoryId } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(`Fetching data for subcategory ID: ${subCategoryId}`);
//     fetch(`/api/colleges/subcategory/${subCategoryId}/colleges/`)
//       .then(response => {
//         if (!response.ok) {
//           console.error(`ERROR: ${response.status} ${response.statusText}`);
//           return response.text().then(text => {
//             throw new Error(`Error ${response.status}: ${text}`);
//           });
//         }
//         return response.json();
//       })
//       .then(jsonData => {
//         console.log('Data fetched successfully', jsonData);
//         setData(jsonData);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, [subCategoryId]);

//   if (loading) {
//     return <p className='text-center text-gray-500'>Loading...</p>;
//   }

//   if (error) {
//     return <p className='text-center text-red-500'>Error: {error}</p>;
//   }

//   if (!data || data.length === 0) {
//     return <p className='text-center text-red-500'>No data available</p>;
//   }

//   const handleCollegeClick = (collegeId) => {
//     navigate(`/college/${collegeId}`);
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-bold mb-4">Colleges</h1>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {data.map((college, index) => (
//           <li
//             key={index}
//             className="aspect-square bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300"
//             onClick={() => handleCollegeClick(college.id)}
//           >
//             <div className="w-full h-60"> {/* Fixed height of 15rem (60) */}
//               <img
//                 src={college.main_image}
//                 alt={`Main Image for ${college.name}`}
//                 onError={(event) => {
//                   event.target.src = placeholderImagePath; // Set placeholder on error
//                 }}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <span className="block text-center text-lg font-medium p-4">{college.name}</span>
//             <p className="text-center text-gray-500">{college.courses}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default CollegeList;



