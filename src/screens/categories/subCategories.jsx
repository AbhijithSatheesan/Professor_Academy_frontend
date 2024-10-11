import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholderImagePath from '../../assets/no_image.png';
import backlogo from '../../assets/professor.png';
import api from '../../../api'; // Assuming your custom Axios instance is imported from this path
import { getFullURL } from '../../../api';



function Subcategories() {
  const { categoryId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [subcategoriesVisible, setSubcategoriesVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for category ID: ${categoryId}`);
        
        // Using the axios instance 'api' to make the API call
        const response = await api.get(`/api/colleges/category/${categoryId}/subcategories/`);
        const jsonData = response.data;

        console.log('Data fetched successfully:', jsonData);
        setData(jsonData);
        setLoading(false);

        const imageUrl = jsonData.image || placeholderImagePath;
        localStorage.setItem('subcategoryBackgroundImage', imageUrl);

        // Show background image and then subcategories with a delay for smooth appearance
        const showBackgroundTimeout = setTimeout(() => {
          setBackgroundVisible(true);

          const showSubcategoriesTimeout = setTimeout(() => {
            setSubcategoriesVisible(true);
          }, 500);

          return () => clearTimeout(showSubcategoriesTimeout);
        }, 100);

        return () => clearTimeout(showBackgroundTimeout);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
        <p className="text-center text-2xl font-semibold text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!data || !data.subcategories || data.subcategories.length === 0) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  const handleSubcategoryClick = (subCategoryId) => {
    navigate(`/colleges/${subCategoryId}`);
  };

  return (
    <div className="p-8 relative min-h-screen">
      {/* Background Image with Blur Effect */}
      <div
        className={`fixed inset-0 bg-cover bg-center blur-sm transition-all duration-1000 ease-in-out ${
          backgroundVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${data.image ? getFullURL(data.image)  : placeholderImagePath})`,
        }}
      />

      {/* Backlogo Fixed in Corner */}
      <div className="fixed top-24 right-6 z-0">
        <img src={backlogo} alt="Backlogo" className="h-20 w-auto" />
      </div>

      {/* Subcategories List */}
      <div className="relative z-10 flex flex-col items-center">
        {subcategoriesVisible ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto w-full max-w-7xl">
            {data.subcategories.map((item, index) => (
              <li
                key={index}
                className="bg-blue-400 border-2 border-black rounded-md p-1 w-full transition duration-300 ease-in-out hover:bg-blue-500 cursor-pointer"
                onClick={() => handleSubcategoryClick(item.id)}
              >
                <span className="block text-center text-lg font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
            <p className="text-center text-2xl font-semibold text-white animate-pulse">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subcategories;








// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import backlogo from '../../assets/professor.png';
// import placeholderImagePath from '../../assets/no_image.png';

// function Subcategories() {
//   const { categoryId } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() =>  {
//     console.log(`Fetching data for category ID: ${categoryId}`);
//     fetch(`/api/colleges/category/${categoryId}/subcategories/`)
//       .then(response => {
//         if (!response.ok) {
//           console.error(`Error: ${response.status} ${response.statusText}`);
//           return response.text().then(text => {
//             throw new Error(`Error ${response.status}: ${text}`);
//           });
//         }
//         return response.json();
//       })
//       .then(jsonData => {
//         console.log('Data fetched successfully:', jsonData);
//         setData(jsonData);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, [categoryId]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">Error: {error}</p>;
//   }

//   if (!data || data.length === 0) {
//     return <p className="text-center text-red-500">No data available</p>;
//   }


//   const handleSubcategoryClick = (subCategoryId) => {
//     navigate(`/colleges/${subCategoryId}`)
//   }

//   return (
//     <div className='p-8 bg-white relative min-h-screen'>
//       <div 
//       className='fixed inset-0 pointer-event-none z-0'
//       style={{
//         backgroundImage: `url(${backlogo})`,
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundSize: '200px'
//       }}
//       ></div>
//       <div className="relative">
//         <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
//         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {data.subcategories.map((item, index) => (
//             <li
//               key={index}
//               className="aspect-square bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300"
//               onClick={() => handleSubcategoryClick(item.id)}
//             >
//               <div className="w-full h-60"> {/* Fixed height of 10rem (40) */}
//                 <img
//                   src={item.image}
//                   alt={`Subcategory Image for ${item.name}`}
//                   onError={(event) => {
//                     event.target.src = placeholderImagePath; // Set placeholder on error
//                   }}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//               <span className="block text-center text-sm font-medium p-4">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Subcategories;

















