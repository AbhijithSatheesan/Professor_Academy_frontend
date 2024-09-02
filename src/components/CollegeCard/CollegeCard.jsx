import React from 'react';
import nocollegeimage from '../../assets/collegeicon.png';
import locationIcon from '../../assets/location-icon.png';
import { useSelector } from 'react-redux';

function CollegeCard({ collegeData, onCollegeClick }) {
  const markedCollegeIds = useSelector(state => state.user?.marked_college_ids || []);
  const isMarked = markedCollegeIds.includes(collegeData.id);
  const isRecommended = collegeData.priority >= 7;

  return (
    <li
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isMarked ? 'border-l-4 border-yellow-400' : ''
      } ${isRecommended ? 'bg-amber-50' : ''}`}
      onClick={() => onCollegeClick(collegeData.id, collegeData)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 lg:w-1/4 h-48 sm:h-auto relative">
          <img
            src={collegeData.main_image || nocollegeimage}
            alt={`${collegeData.name}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {isMarked && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              MARKED
            </div>
          )}
          {isRecommended && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              RECOMMENDED
            </div>
          )}
        </div>
        <div className="p-6 flex-grow">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{collegeData.name}</h2>
          <div className="flex items-center mb-4 text-gray-600">
            <img src={locationIcon} alt="Location" className="h-5 w-5 mr-2" />
            <span>{collegeData.location}</span>
          </div>
          <button className={`mt-4 text-white py-2 px-4 rounded-md transition-colors duration-300 ${
            isRecommended ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}>
            Learn More
          </button>
        </div>
      </div>
    </li>
  );
}

export default CollegeCard;