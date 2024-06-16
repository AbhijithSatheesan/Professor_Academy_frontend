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
    return <p className='text-center text-gray-500'>Loading...</p>;
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto w-full max-w-7xl">
            {data.map((item, index) => (
              <li
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex flex-col sm:flex-row hover:bg-indigo-50 cursor-pointer"
                onClick={() => handleCollegeClick(item.id, item)}
              >
                <div className="w-full sm:w-1/2 p-2">
                  <div className="aspect-w-16 aspect-h-9" style={{ height: '10rem' }}>
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
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
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



