import React from 'react';
import { useLocation } from 'react-router-dom';

const CollegePage = () => {
  const location = useLocation();
  const collegeData = location.state?.collegeData || null;

  console.log(collegeData);

  if (!collegeData) {
    return <div className="text-center text-red-500">No college data available</div>;
  }

  const {
    name,
    courses,
    priority,
    main_image,
    hostel_image,
    library_image,
    class_image,
    lab_image,
    other_images,
    category,
    parent_subcategory,
  } = collegeData;

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl text-white font-bold mb-4">{name}</h1>
      <p className="mb-2">
        <span className="font-semibold">Courses:</span> {courses}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Priority:</span> {priority}
      </p>
      <img src={main_image} alt="Main Image" className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Hostel Image</h2>
      <img src={hostel_image} alt="Hostel Image" className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Library Image</h2>
      <img src={library_image} alt="Library Image" className="mb-4" /> 
      <h2 className="text-xl font-bold mb-2">Class Image</h2>
      <img src={class_image} alt="Class Image" className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Lab Image</h2>
      <img src={lab_image} alt="Lab Image" className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Other Images</h2>
      <img src={other_images} alt="Other Images" className="mb-4" />
      <p className="mb-2">
        <span className="font-semibold">Category:</span> {category}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Parent Subcategory:</span> {parent_subcategory}
      </p>
    </div>
  );
};

export default CollegePage;