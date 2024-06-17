import React from 'react';
import placeholderImagePath from '../../assets/no_image.png';
import locationIcon from '../../assets/location-icon.png';
import { useSelector } from 'react-redux';

function CollegeCard({ collegeData, onCollegeClick }) {
  const markedCollegeIds = useSelector(state => state.user?.marked_college_ids || []);
  const isMarked = markedCollegeIds.includes(collegeData.id);

  return (
    <li
      className={`bg-white shadow-lg rounded-sm overflow-hidden transition-transform transform hover:scale-105 duration-300 flex flex-col md:flex-row hover:bg-indigo-50 cursor-pointer ${
        isMarked ? 'bg-yellow-50' : ''
      }`}
      onClick={() => onCollegeClick(collegeData.id, collegeData)}
    >
      <div className="w-full md:w-1/3 h-48 md:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={collegeData.main_image}
          alt={`Subcategory Image for ${collegeData.name}`}
          onError={(event) => {
            event.target.src = placeholderImagePath;
          }}
          className="object-cover w-full h-full p-2"
        />
      </div>
      <div className="p-6 flex-grow relative">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{collegeData.name}</h2>
        <h2 className="text-xl font-bold mb-2 text-gray-800">{collegeData.priority}</h2>
        <p className="flex items-center mb-2 text-gray-600">
          <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
          {collegeData.location}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Courses:</span>{' '}
          {collegeData.courses ? (
            collegeData.courses.split(',').map((course, index) => (
              <span
                key={index}
                className="inline-block mr-2 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md"
              >
                {course.trim()}
              </span>
            ))
          ) : (
            <span>No courses available</span>
          )}
        </p>
        {isMarked && (
          <button className="absolute top-0.5 right-2 bg-black text-white px-2 py-0.5 text-xs">
            MARKED
          </button>
        )}
      </div>
    </li>
  );
}

export default CollegeCard;