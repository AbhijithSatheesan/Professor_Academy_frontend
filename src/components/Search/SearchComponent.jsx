import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backlogo from '../../assets/professor.png';
import CollegeCard from '../../components/CollegeCard/CollegeCard';

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/colleges/searchcollege?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
      setLoading(false);

      // Show the results after a short delay
      setTimeout(() => {
        setResultsVisible(true);
      }, 300);
    } catch (err) {
      setError('An error occurred while fetching search results.');
      console.error('Search error:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <img src={backlogo} alt="Loading..." className="h-20 w-auto mb-4 animate-pulse" />
        <p className='text-center text-xl font-semibold text-gray-800 animate-pulse'>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className='text-center text-red-500 bg-gray-200 min-h-screen py-8'>Error: {error}</p>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <p className="text-center text-red-500 bg-gray-200 min-h-screen py-8">No results found</p>;
  }

  const handleCollegeClick = (collegeId, collegeData) => {
    navigate(`/college/${collegeId}`, { state: { collegeData } });
  };

  const sortedResults = searchResults.slice().sort((a, b) => b.priority - a.priority);

  return (
    <div className="p-8 relative min-h-screen bg-green-200">
      <div className="fixed top-24 right-6 z-0">
        <img src={backlogo} alt="Backlogo" className="h-20 w-auto" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Results</h2>
        {resultsVisible ? (
          <ul className="flex flex-col w-full max-w-4xl space-y-4">
            {sortedResults.map((item, index) => (
              <CollegeCard
                key={index}
                collegeData={item}
                onCollegeClick={handleCollegeClick}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 animate-pulse">Loading results...</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;